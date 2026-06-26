const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../auth');

const router = express.Router();
router.use(authMiddleware);

// Get all orders for user
router.get('/', async (req, res) => {
  const orders = await db.prepare(`
    SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC
  `).all(req.userId);

  // Attach items to each order
  const getItems = db.prepare(`
    SELECT oi.*, d.name, d.boutique, d.image_url, d.collection
    FROM order_items oi
    JOIN dresses d ON oi.dress_id = d.id
    WHERE oi.order_id = ?
  `);

  const result = [];
  for (const order of orders) {
    result.push({ ...order, items: await getItems.all(order.id) });
  }

  res.json(result);
});

// Get single order
router.get('/:id', async (req, res) => {
  const order = await db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(
    req.params.id, req.userId
  );
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const items = await db.prepare(`
    SELECT oi.*, d.name, d.boutique, d.image_url, d.collection
    FROM order_items oi
    JOIN dresses d ON oi.dress_id = d.id
    WHERE oi.order_id = ?
  `).all(order.id);

  res.json({ ...order, items });
});

// Place order (from cart)
router.post('/', async (req, res) => {
  const { delivery_speed = '24h', payment_method = 'card',
          address_street, address_city, address_district, address_postal } = req.body;

  // Get cart items
  const cartItems = await db.prepare(`
    SELECT ci.*, d.price, d.name FROM cart_items ci
    JOIN dresses d ON ci.dress_id = d.id
    WHERE ci.user_id = ?
  `).all(req.userId);

  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = delivery_speed === '3h' ? 100 : 0;
  const total = subtotal + deliveryFee;

  // Generate order number
  const orderCount = (await db.prepare('SELECT COUNT(*) as count FROM orders').get()).count;
  const orderNumber = `ORD-2026-${String(orderCount + 1).padStart(3, '0')}`;

  // Get user address as fallback
  const user = await db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);

  // Atomic: create order + items, then clear cart.
  const tx = await db.client.transaction('write');
  let orderId;
  try {
    const result = await tx.execute({
      sql: `INSERT INTO orders (user_id, order_number, total, delivery_fee, delivery_speed,
              address_street, address_city, address_district, address_postal, payment_method)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        req.userId, orderNumber, total, deliveryFee, delivery_speed,
        address_street || user.address_street || '123 King Fahd Road',
        address_city || user.address_city || 'Riyadh',
        address_district || user.address_district || 'Al Olaya District',
        address_postal || user.address_postal || '12345',
        payment_method,
      ],
    });

    orderId = Number(result.lastInsertRowid);

    for (const item of cartItems) {
      await tx.execute({
        sql: 'INSERT INTO order_items (order_id, dress_id, quantity, size, price) VALUES (?, ?, ?, ?, ?)',
        args: [orderId, item.dress_id, item.quantity, item.size, item.price],
      });
    }

    await tx.execute({
      sql: 'DELETE FROM cart_items WHERE user_id = ?',
      args: [req.userId],
    });

    await tx.commit();
  } catch (e) {
    await tx.rollback();
    throw e;
  }

  // Return the created order
  const order = await db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
  const items = await db.prepare(`
    SELECT oi.*, d.name, d.boutique, d.image_url, d.collection
    FROM order_items oi JOIN dresses d ON oi.dress_id = d.id
    WHERE oi.order_id = ?
  `).all(orderId);

  res.status(201).json({ ...order, items });
});

module.exports = router;
