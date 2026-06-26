const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../auth');

const router = express.Router();
router.use(authMiddleware);

// Get all exclusives for user
router.get('/', async (req, res) => {
  const items = await db.prepare(`
    SELECT e.id, e.dress_id, e.event_name, e.event_date, e.venue, e.occasion, e.status, e.created_at,
           d.name, d.boutique, d.price, d.rating, d.reviews, d.express, d.collection, d.image_url
    FROM exclusives e
    JOIN dresses d ON e.dress_id = d.id
    WHERE e.user_id = ?
    ORDER BY e.created_at DESC
  `).all(req.userId);

  res.json(items);
});

// Request exclusivity for a dress
router.post('/', async (req, res) => {
  const { dress_id, event_name, event_date, venue, occasion = 'Wedding' } = req.body;

  if (!dress_id) return res.status(400).json({ error: 'dress_id is required' });
  if (!event_date) return res.status(400).json({ error: 'event_date is required' });
  if (!venue) return res.status(400).json({ error: 'venue is required' });

  const dress = await db.prepare('SELECT id FROM dresses WHERE id = ?').get(dress_id);
  if (!dress) return res.status(404).json({ error: 'Dress not found' });

  // Check if already exclusive for this dress/venue/date combo
  const existing = await db.prepare(
    'SELECT id FROM exclusives WHERE dress_id = ? AND venue = ? AND event_date = ? AND status = ?'
  ).get(dress_id, venue, event_date, 'active');

  if (existing) {
    return res.status(409).json({ error: 'This dress is already reserved for this venue and date' });
  }

  await db.prepare(`
    INSERT INTO exclusives (user_id, dress_id, event_name, event_date, venue, occasion)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(req.userId, dress_id, event_name || occasion, event_date, venue, occasion);

  // Return updated list
  const items = await db.prepare(`
    SELECT e.id, e.dress_id, e.event_name, e.event_date, e.venue, e.occasion, e.status, e.created_at,
           d.name, d.boutique, d.price, d.rating, d.reviews, d.express, d.collection, d.image_url
    FROM exclusives e
    JOIN dresses d ON e.dress_id = d.id
    WHERE e.user_id = ?
    ORDER BY e.created_at DESC
  `).all(req.userId);

  res.status(201).json(items);
});

// Cancel exclusivity
router.delete('/:id', async (req, res) => {
  await db.prepare('UPDATE exclusives SET status = ? WHERE id = ? AND user_id = ?').run(
    'cancelled', req.params.id, req.userId
  );

  const items = await db.prepare(`
    SELECT e.id, e.dress_id, e.event_name, e.event_date, e.venue, e.occasion, e.status, e.created_at,
           d.name, d.boutique, d.price, d.rating, d.reviews, d.express, d.collection, d.image_url
    FROM exclusives e
    JOIN dresses d ON e.dress_id = d.id
    WHERE e.user_id = ?
    ORDER BY e.created_at DESC
  `).all(req.userId);

  res.json(items);
});

module.exports = router;
