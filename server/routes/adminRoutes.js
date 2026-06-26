const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { put } = require('@vercel/blob');
const db = require('../db');

const router = express.Router();

// Buffer uploads in memory; persist to Vercel Blob (prod) or local disk (dev).
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

// Returns { url, filename }. Uses Vercel Blob when BLOB_READ_WRITE_TOKEN is set
// (always true on Vercel once a Blob store is connected), else writes to ./uploads.
async function saveImage(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/${filename}`, file.buffer, {
      access: 'public',
      contentType: file.mimetype,
    });
    return { url: blob.url, filename };
  }

  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  fs.writeFileSync(path.join(uploadsDir, filename), file.buffer);
  return { url: `/uploads/${filename}`, filename };
}

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'darvelour-admin-secret';

// --- Admin Auth ---

function adminAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, ADMIN_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ error: 'Not admin' });
    req.adminId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid admin token' });
  }
}

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const admin = await db.prepare('SELECT * FROM admins WHERE email = ?').get(email);
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email, isAdmin: true }, ADMIN_SECRET, { expiresIn: '24h' });
  res.json({ admin: { id: admin.id, name: admin.name, email: admin.email }, token });
});

// Admin Me
router.get('/me', adminAuth, async (req, res) => {
  const admin = await db.prepare('SELECT id, name, email FROM admins WHERE id = ?').get(req.adminId);
  if (!admin) return res.status(404).json({ error: 'Admin not found' });
  res.json(admin);
});

// --- Dashboard Stats ---
router.get('/stats', adminAuth, async (req, res) => {
  const totalOrders = (await db.prepare('SELECT COUNT(*) as count FROM orders').get()).count;
  const totalRevenue = (await db.prepare('SELECT COALESCE(SUM(total), 0) as total FROM orders').get()).total;
  const totalCustomers = (await db.prepare('SELECT COUNT(*) as count FROM users').get()).count;
  const totalDresses = (await db.prepare('SELECT COUNT(*) as count FROM dresses').get()).count;
  const totalBoutiques = (await db.prepare('SELECT COUNT(DISTINCT boutique) as count FROM dresses').get()).count;
  const activeExclusives = (await db.prepare("SELECT COUNT(*) as count FROM exclusives WHERE status = 'active'").get()).count;
  const pendingOrders = (await db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'processing'").get()).count;

  res.json({ totalOrders, totalRevenue, totalCustomers, totalDresses, totalBoutiques, activeExclusives, pendingOrders });
});

// --- Boutiques CRUD ---
router.get('/boutiques', adminAuth, async (req, res) => {
  const boutiques = await db.prepare('SELECT * FROM boutiques ORDER BY name').all();
  // Get dress count per boutique
  const counts = await db.prepare('SELECT boutique, COUNT(*) as count FROM dresses GROUP BY boutique').all();
  const countMap = {};
  counts.forEach(c => { countMap[c.boutique] = c.count; });
  res.json(boutiques.map(b => ({ ...b, dressCount: countMap[b.name] || 0 })));
});

router.post('/boutiques', adminAuth, async (req, res) => {
  const { name, description, location, rating, verified, specialties, phone, email, image_url } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const result = await db.prepare(
      'INSERT INTO boutiques (name, description, location, rating, verified, specialties, phone, email, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(name, description || '', location || '', rating || 4.5, verified ? 1 : 0, specialties || '', phone || '', email || '', image_url || '');
    res.status(201).json({ id: result.lastInsertRowid, name });
  } catch (e) {
    res.status(400).json({ error: 'Boutique name already exists' });
  }
});

router.put('/boutiques/:id', adminAuth, async (req, res) => {
  const { name, description, location, rating, verified, specialties, phone, email, image_url } = req.body;
  await db.prepare(
    'UPDATE boutiques SET name=COALESCE(?,name), description=COALESCE(?,description), location=COALESCE(?,location), rating=COALESCE(?,rating), verified=COALESCE(?,verified), specialties=COALESCE(?,specialties), phone=COALESCE(?,phone), email=COALESCE(?,email), image_url=COALESCE(?,image_url) WHERE id=?'
  ).run(name, description, location, rating, verified !== undefined ? (verified ? 1 : 0) : null, specialties, phone, email, image_url !== undefined ? image_url : null, req.params.id);
  const boutique = await db.prepare('SELECT * FROM boutiques WHERE id = ?').get(req.params.id);
  res.json(boutique);
});

router.delete('/boutiques/:id', adminAuth, async (req, res) => {
  await db.prepare('DELETE FROM boutiques WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// --- Dresses CRUD ---
router.get('/dresses', adminAuth, async (req, res) => {
  const dresses = await db.prepare('SELECT * FROM dresses ORDER BY id DESC').all();
  res.json(dresses);
});

router.post('/dresses', adminAuth, async (req, res) => {
  const { name, boutique, price, rating, reviews, express, collection, image_url, description, sizes } = req.body;
  if (!name || !boutique || !price) return res.status(400).json({ error: 'Name, boutique and price are required' });

  const result = await db.prepare(
    'INSERT INTO dresses (name, boutique, price, rating, reviews, express, collection, image_url, description, sizes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(name, boutique, price, rating || 4.0, reviews || 0, express ? 1 : 0, collection || 'Evening Collection', image_url || '', description || '', sizes || 'S,M,L');

  const dress = await db.prepare('SELECT * FROM dresses WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(dress);
});

router.put('/dresses/:id', adminAuth, async (req, res) => {
  const { name, boutique, price, rating, reviews, express, collection, image_url, description, sizes, in_stock } = req.body;
  await db.prepare(
    'UPDATE dresses SET name=COALESCE(?,name), boutique=COALESCE(?,boutique), price=COALESCE(?,price), rating=COALESCE(?,rating), reviews=COALESCE(?,reviews), express=COALESCE(?,express), collection=COALESCE(?,collection), image_url=COALESCE(?,image_url), description=COALESCE(?,description), sizes=COALESCE(?,sizes), in_stock=COALESCE(?,in_stock) WHERE id=?'
  ).run(name, boutique, price, rating, reviews, express !== undefined ? (express ? 1 : 0) : null, collection, image_url, description, sizes, in_stock !== undefined ? (in_stock ? 1 : 0) : null, req.params.id);
  const dress = await db.prepare('SELECT * FROM dresses WHERE id = ?').get(req.params.id);
  res.json(dress);
});

router.delete('/dresses/:id', adminAuth, async (req, res) => {
  await db.prepare('DELETE FROM dresses WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// --- Orders Management ---
router.get('/orders', adminAuth, async (req, res) => {
  const orders = await db.prepare(`
    SELECT o.*, u.name as customer_name, u.email as customer_email
    FROM orders o JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `).all();

  const getItems = db.prepare(`
    SELECT oi.*, d.name, d.boutique, d.image_url
    FROM order_items oi JOIN dresses d ON oi.dress_id = d.id
    WHERE oi.order_id = ?
  `);

  const ordersWithItems = [];
  for (const order of orders) {
    ordersWithItems.push({ ...order, items: await getItems.all(order.id) });
  }

  res.json(ordersWithItems);
});

router.put('/orders/:id/status', adminAuth, async (req, res) => {
  const { status } = req.body;
  if (!['processing', 'in-transit', 'delivered', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  await db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ success: true, status });
});

// --- Exclusives Management ---
router.get('/exclusives', adminAuth, async (req, res) => {
  const exclusives = await db.prepare(`
    SELECT e.*, d.name as dress_name, d.boutique, d.price, u.name as customer_name, u.email as customer_email
    FROM exclusives e
    JOIN dresses d ON e.dress_id = d.id
    JOIN users u ON e.user_id = u.id
    ORDER BY e.created_at DESC
  `).all();
  res.json(exclusives);
});

router.put('/exclusives/:id/status', adminAuth, async (req, res) => {
  const { status } = req.body;
  if (!['active', 'cancelled', 'expired'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  await db.prepare('UPDATE exclusives SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ success: true, status });
});

// --- Customers ---
router.get('/customers', adminAuth, async (req, res) => {
  const customers = await db.prepare('SELECT id, name, email, phone, created_at FROM users ORDER BY created_at DESC').all();
  res.json(customers);
});

// --- Image Upload ---
router.post('/upload', adminAuth, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file provided' });
  const { url, filename } = await saveImage(req.file);
  res.json({ url, filename });
});

// Upload and attach to dress
router.post('/dresses/:id/image', adminAuth, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file provided' });
  const { url } = await saveImage(req.file);
  await db.prepare('UPDATE dresses SET image_url = ? WHERE id = ?').run(url, req.params.id);
  const dress = await db.prepare('SELECT * FROM dresses WHERE id = ?').get(req.params.id);
  res.json(dress);
});

// Upload and attach to boutique
router.post('/boutiques/:id/image', adminAuth, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file provided' });
  const { url } = await saveImage(req.file);
  await db.prepare('UPDATE boutiques SET image_url = ? WHERE id = ?').run(url, req.params.id);
  const boutique = await db.prepare('SELECT * FROM boutiques WHERE id = ?').get(req.params.id);
  res.json(boutique);
});

module.exports = router;
