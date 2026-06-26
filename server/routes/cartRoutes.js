const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../auth');

const router = express.Router();
router.use(authMiddleware);

// Get cart
router.get('/', async (req, res) => {
  const items = await db.prepare(`
    SELECT ci.id, ci.dress_id, ci.quantity, ci.size,
           d.name, d.boutique, d.price, d.rating, d.reviews, d.express, d.collection, d.image_url
    FROM cart_items ci
    JOIN dresses d ON ci.dress_id = d.id
    WHERE ci.user_id = ?
    ORDER BY ci.id
  `).all(req.userId);

  res.json(items);
});

// Add to cart
router.post('/', async (req, res) => {
  const { dress_id, quantity = 1, size = 'M' } = req.body;

  if (!dress_id) return res.status(400).json({ error: 'dress_id is required' });

  const dress = await db.prepare('SELECT id FROM dresses WHERE id = ?').get(dress_id);
  if (!dress) return res.status(404).json({ error: 'Dress not found' });

  // Try to update existing item
  const existing = await db.prepare(
    'SELECT id, quantity FROM cart_items WHERE user_id = ? AND dress_id = ? AND size = ?'
  ).get(req.userId, dress_id, size);

  if (existing) {
    await db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?').run(quantity, existing.id);
  } else {
    await db.prepare('INSERT INTO cart_items (user_id, dress_id, quantity, size) VALUES (?, ?, ?, ?)').run(
      req.userId, dress_id, quantity, size
    );
  }

  // Return updated cart
  const items = await db.prepare(`
    SELECT ci.id, ci.dress_id, ci.quantity, ci.size,
           d.name, d.boutique, d.price, d.rating, d.reviews, d.express, d.collection
    FROM cart_items ci JOIN dresses d ON ci.dress_id = d.id
    WHERE ci.user_id = ?
  `).all(req.userId);

  res.json(items);
});

// Update cart item quantity
router.put('/:id', async (req, res) => {
  const { quantity } = req.body;

  if (quantity <= 0) {
    await db.prepare('DELETE FROM cart_items WHERE id = ? AND user_id = ?').run(req.params.id, req.userId);
  } else {
    await db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?').run(
      quantity, req.params.id, req.userId
    );
  }

  const items = await db.prepare(`
    SELECT ci.id, ci.dress_id, ci.quantity, ci.size,
           d.name, d.boutique, d.price, d.rating, d.reviews, d.express, d.collection
    FROM cart_items ci JOIN dresses d ON ci.dress_id = d.id
    WHERE ci.user_id = ?
  `).all(req.userId);

  res.json(items);
});

// Remove from cart
router.delete('/:id', async (req, res) => {
  await db.prepare('DELETE FROM cart_items WHERE id = ? AND user_id = ?').run(req.params.id, req.userId);

  const items = await db.prepare(`
    SELECT ci.id, ci.dress_id, ci.quantity, ci.size,
           d.name, d.boutique, d.price, d.rating, d.reviews, d.express, d.collection
    FROM cart_items ci JOIN dresses d ON ci.dress_id = d.id
    WHERE ci.user_id = ?
  `).all(req.userId);

  res.json(items);
});

// Clear cart
router.delete('/', async (req, res) => {
  await db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.userId);
  res.json([]);
});

module.exports = router;
