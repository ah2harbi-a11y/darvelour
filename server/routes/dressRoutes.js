const express = require('express');
const db = require('../db');
const { optionalAuth } = require('../auth');

const router = express.Router();

// Get all dresses (with optional filters)
router.get('/', optionalAuth, async (req, res) => {
  const { collection, boutique, min_price, max_price, express: isExpress, search, sort } = req.query;

  let query = 'SELECT * FROM dresses WHERE in_stock = 1';
  const params = [];

  if (collection && collection !== 'all') {
    query += ' AND collection = ?';
    params.push(collection);
  }
  if (boutique) {
    query += ' AND boutique = ?';
    params.push(boutique);
  }
  if (min_price) {
    query += ' AND price >= ?';
    params.push(Number(min_price));
  }
  if (max_price) {
    query += ' AND price <= ?';
    params.push(Number(max_price));
  }
  if (isExpress === '1') {
    query += ' AND express = 1';
  }
  if (search) {
    query += ' AND (name LIKE ? OR boutique LIKE ? OR collection LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  switch (sort) {
    case 'price_asc': query += ' ORDER BY price ASC'; break;
    case 'price_desc': query += ' ORDER BY price DESC'; break;
    case 'rating': query += ' ORDER BY rating DESC'; break;
    case 'newest': query += ' ORDER BY created_at DESC'; break;
    default: query += ' ORDER BY id ASC';
  }

  const dresses = await db.prepare(query).all(...params);
  res.json(dresses);
});

// Get boutiques list (must be before /:id)
router.get('/boutiques', async (req, res) => {
  // Try to get from boutiques table first, fall back to distinct dress boutiques
  try {
    const boutiquesTable = await db.prepare('SELECT * FROM boutiques ORDER BY sort_order ASC, name ASC').all();
    if (boutiquesTable.length > 0) {
      // Merge with dress counts
      const counts = await db.prepare('SELECT boutique, COUNT(*) as count FROM dresses WHERE in_stock = 1 GROUP BY boutique').all();
      const countMap = {};
      counts.forEach(c => { countMap[c.boutique] = c.count; });

      // Also include boutiques that only exist as dress references
      const dressOnlyBoutiques = await db.prepare('SELECT DISTINCT boutique FROM dresses WHERE in_stock = 1 ORDER BY boutique').all();
      const boutiqueNames = new Set(boutiquesTable.map(b => b.name));
      const extra = dressOnlyBoutiques.filter(d => !boutiqueNames.has(d.boutique)).map(d => ({
        name: d.boutique, description: '', location: '', rating: 4.5, reviews: 0, verified: 0, specialties: '', dressCount: countMap[d.boutique] || 0
      }));

      const result = boutiquesTable.map(b => ({
        ...b,
        verified: !!b.verified,
        specialties: b.specialties ? b.specialties.split(',').map(s => s.trim()).filter(Boolean) : [],
        dressCount: countMap[b.name] || 0,
      }));

      return res.json([...result, ...extra]);
    }
  } catch {}

  // Fallback: just return boutique names from dresses
  const boutiques = await db.prepare('SELECT DISTINCT boutique FROM dresses ORDER BY boutique').all();
  res.json(boutiques.map(b => b.boutique));
});

// Get collections list
router.get('/collections', async (req, res) => {
  const collections = await db.prepare('SELECT DISTINCT collection FROM dresses ORDER BY collection').all();
  res.json(collections.map(c => c.collection));
});

// Get single dress
router.get('/:id', async (req, res) => {
  const dress = await db.prepare('SELECT * FROM dresses WHERE id = ?').get(req.params.id);
  if (!dress) return res.status(404).json({ error: 'Dress not found' });
  res.json(dress);
});

module.exports = router;
