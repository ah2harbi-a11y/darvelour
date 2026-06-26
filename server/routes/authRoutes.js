const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { generateToken, authMiddleware } = require('../auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  const existing = await db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = await db.prepare(
    'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)'
  ).run(name, email, hashedPassword, phone || null);

  const user = { id: result.lastInsertRowid, name, email };
  const token = generateToken(user);

  res.status(201).json({ user: { id: user.id, name, email, phone }, token });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = generateToken(user);
  res.json({
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
    token,
  });
});

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  const user = await db.prepare(
    'SELECT id, name, email, phone, address_street, address_city, address_district, address_postal FROM users WHERE id = ?'
  ).get(req.userId);

  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Update profile
router.put('/me', authMiddleware, async (req, res) => {
  const { name, phone, address_street, address_city, address_district, address_postal } = req.body;

  await db.prepare(`
    UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone),
    address_street = COALESCE(?, address_street), address_city = COALESCE(?, address_city),
    address_district = COALESCE(?, address_district), address_postal = COALESCE(?, address_postal)
    WHERE id = ?
  `).run(name, phone, address_street, address_city, address_district, address_postal, req.userId);

  const user = await db.prepare(
    'SELECT id, name, email, phone, address_street, address_city, address_district, address_postal FROM users WHERE id = ?'
  ).get(req.userId);

  res.json(user);
});

module.exports = router;
