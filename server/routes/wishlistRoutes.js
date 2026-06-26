const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../auth');

const router = express.Router();
router.use(authMiddleware);

// Get wishlist
router.get('/', async (req, res) => {
  const items = await db.prepare(`
    SELECT w.id, w.dress_id, w.created_at,
           d.name, d.boutique, d.price, d.rating, d.reviews, d.express, d.collection, d.image_url
    FROM wishlist w
    JOIN dresses d ON w.dress_id = d.id
    WHERE w.user_id = ?
    ORDER BY w.created_at DESC
  `).all(req.userId);

  res.json(items);
});

// Add to wishlist (toggle)
router.post('/', async (req, res) => {
  const { dress_id } = req.body;
  if (!dress_id) return res.status(400).json({ error: 'dress_id is required' });

  const existing = await db.prepare(
    'SELECT id FROM wishlist WHERE user_id = ? AND dress_id = ?'
  ).get(req.userId, dress_id);

  if (existing) {
    // Remove if already exists (toggle)
    await db.prepare('DELETE FROM wishlist WHERE id = ?').run(existing.id);
  } else {
    await db.prepare('INSERT INTO wishlist (user_id, dress_id) VALUES (?, ?)').run(req.userId, dress_id);
  }

  // Return updated wishlist
  const items = await db.prepare(`
    SELECT w.id, w.dress_id, w.created_at,
           d.name, d.boutique, d.price, d.rating, d.reviews, d.express, d.collection
    FROM wishlist w JOIN dresses d ON w.dress_id = d.id
    WHERE w.user_id = ?
    ORDER BY w.created_at DESC
  `).all(req.userId);

  res.json(items);
});

// Remove from wishlist
router.delete('/:dressId', async (req, res) => {
  await db.prepare('DELETE FROM wishlist WHERE user_id = ? AND dress_id = ?').run(
    req.userId, req.params.dressId
  );

  const items = await db.prepare(`
    SELECT w.id, w.dress_id, w.created_at,
           d.name, d.boutique, d.price, d.rating, d.reviews, d.express, d.collection
    FROM wishlist w JOIN dresses d ON w.dress_id = d.id
    WHERE w.user_id = ?
    ORDER BY w.created_at DESC
  `).all(req.userId);

  res.json(items);
});

module.exports = router;
