// One-time (idempotent) schema + seed for the libSQL/Turso database.
// Run locally against your Turso DB before the first deploy:
//   TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... node server/init-db.js
// Safe to re-run: tables use IF NOT EXISTS and seeds are count-guarded.
const bcrypt = require('bcryptjs');
const { client } = require('./db');

async function init() {
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      address_street TEXT,
      address_city TEXT DEFAULT 'Riyadh',
      address_district TEXT,
      address_postal TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS dresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      boutique TEXT NOT NULL,
      price REAL NOT NULL,
      rating REAL DEFAULT 4.0,
      reviews INTEGER DEFAULT 0,
      express INTEGER DEFAULT 0,
      collection TEXT DEFAULT 'Evening Collection',
      image_url TEXT,
      images TEXT DEFAULT '[]',
      description TEXT,
      sizes TEXT DEFAULT 'S,M,L',
      in_stock INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      dress_id INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,
      size TEXT DEFAULT 'M',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (dress_id) REFERENCES dresses(id) ON DELETE CASCADE,
      UNIQUE(user_id, dress_id, size)
    );

    CREATE TABLE IF NOT EXISTS wishlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      dress_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (dress_id) REFERENCES dresses(id) ON DELETE CASCADE,
      UNIQUE(user_id, dress_id)
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      order_number TEXT UNIQUE NOT NULL,
      status TEXT DEFAULT 'processing',
      total REAL NOT NULL,
      delivery_fee REAL DEFAULT 0,
      delivery_speed TEXT DEFAULT '24h',
      address_street TEXT,
      address_city TEXT,
      address_district TEXT,
      address_postal TEXT,
      payment_method TEXT DEFAULT 'card',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      dress_id INTEGER NOT NULL,
      quantity INTEGER DEFAULT 1,
      size TEXT DEFAULT 'M',
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (dress_id) REFERENCES dresses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS exclusives (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      dress_id INTEGER NOT NULL,
      event_name TEXT NOT NULL,
      event_date TEXT NOT NULL,
      venue TEXT NOT NULL,
      occasion TEXT DEFAULT 'Wedding',
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (dress_id) REFERENCES dresses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS boutiques (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      location TEXT,
      rating REAL DEFAULT 4.5,
      reviews INTEGER DEFAULT 0,
      verified INTEGER DEFAULT 0,
      specialties TEXT DEFAULT '',
      phone TEXT,
      email TEXT,
      image_url TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrations for databases created before a column existed (idempotent).
  try { await client.execute("ALTER TABLE dresses ADD COLUMN images TEXT DEFAULT '[]'"); } catch (e) { /* already exists */ }
  try { await client.execute("ALTER TABLE boutiques ADD COLUMN sort_order INTEGER DEFAULT 0"); } catch (e) { /* already exists */ }

  // --- Seed dresses ---
  const dressCount = (await client.execute('SELECT COUNT(*) as count FROM dresses')).rows[0].count;
  if (dressCount === 0) {
    const dresses = [
      ['Elegant Maxi Dress', 'Boutique Alya', 2500, 4.0, 128, 1, 'Evening Collection'],
      ['Classic Midi Dress', 'Boutique Noor', 2950, 4.1, 95, 0, 'Evening Collection'],
      ['Modern Evening Dress', 'Boutique Reem', 3400, 4.2, 112, 0, 'Evening Collection'],
      ['Sophisticated Maxi Dress', 'Boutique Layla', 3850, 4.3, 87, 1, 'Spring Collection'],
      ['Timeless Evening Gown', 'Boutique Alya', 4200, 4.4, 156, 0, 'Evening Collection'],
      ['Exquisite Maxi Dress', 'Boutique Noor', 4650, 4.5, 73, 1, 'Spring Collection'],
      ['Refined Midi Dress', 'Boutique Reem', 5100, 4.6, 201, 0, 'Evening Collection'],
      ['Classic Evening Gown', 'Boutique Layla', 5550, 4.7, 64, 0, 'Evening Collection'],
      ['Modern Maxi Dress', 'Boutique Alya', 6000, 4.8, 189, 1, 'Spring Collection'],
      ['Elegant Midi Dress', 'Boutique Noor', 6450, 4.9, 142, 0, 'Evening Collection'],
      ['Sophisticated Evening Gown', 'Boutique Reem', 6900, 5.0, 231, 0, 'Spring Collection'],
      ['Timeless Maxi Dress', 'Boutique Layla', 7350, 4.8, 167, 1, 'Evening Collection'],
      ['Refined Evening Gown', 'Maison Layla', 4900, 4.7, 98, 1, 'New Arrivals'],
      ['Modern Evening Gown', 'Maison Sara', 5700, 4.6, 76, 0, 'New Arrivals'],
      ['Classic Evening Gown', 'Maison Hana', 6500, 4.8, 134, 0, 'New Arrivals'],
      ['Elegant Evening Gown', 'Maison Noor', 5200, 4.5, 89, 1, 'New Arrivals'],
    ];
    await client.batch(
      dresses.map((d) => ({
        sql: 'INSERT INTO dresses (name, boutique, price, rating, reviews, express, collection) VALUES (?, ?, ?, ?, ?, ?, ?)',
        args: d,
      })),
      'write'
    );
    console.log('Seeded 16 dresses');
  }

  // --- Seed boutiques ---
  const boutiqueCount = (await client.execute('SELECT COUNT(*) as count FROM boutiques')).rows[0].count;
  if (boutiqueCount === 0) {
    const seedBoutiques = [
      ['Boutique Alya', 'Premium evening wear specializing in elegant, modest designs for special events.', 'Al Olaya, Riyadh', 4.8, 234, 1, 'Evening Wear,Wedding Guest'],
      ['Boutique Noor', 'Contemporary luxury fashion blending tradition with modern silhouettes.', 'King Fahd Rd, Riyadh', 4.7, 189, 1, 'Cocktail Dresses,Modest Luxury'],
      ['Boutique Reem', 'Haute couture inspired designs crafted with the finest fabrics and detailing.', 'Tahlia St, Jeddah', 4.9, 312, 1, 'Haute Couture,Evening Gowns'],
      ['Boutique Layla', 'Timeless sophistication for the modern woman. Exclusive occasion wear.', 'Al Khobar, Eastern Province', 4.6, 156, 1, 'Formal Events,Bridal Party'],
      ['Maison Layla', 'Artisanal evening gowns with a focus on hand-embroidered details and luxury fabrics.', 'Al Rawdah, Riyadh', 4.7, 98, 1, 'Artisanal,Evening Gowns'],
      ['Maison Sara', 'Bold and modern designer pieces for women who want to make a statement.', 'Granada Mall, Riyadh', 4.6, 76, 0, 'Modern Design,Statement Pieces'],
      ['Maison Hana', 'Classic elegance meets Saudi heritage. Curated collection of premium evening wear.', 'Red Sea Mall, Jeddah', 4.8, 134, 1, 'Heritage,Classic Elegance'],
      ['Maison Noor', 'Luxury occasion wear designed for confidence and grace at every event.', 'Panorama Mall, Riyadh', 4.5, 89, 0, 'Occasion Wear,Luxury'],
    ];
    await client.batch(
      seedBoutiques.map((b) => ({
        sql: 'INSERT INTO boutiques (name, description, location, rating, reviews, verified, specialties) VALUES (?, ?, ?, ?, ?, ?, ?)',
        args: b,
      })),
      'write'
    );
    console.log('Seeded 8 boutiques');
  }

  // --- Seed default admin ---
  const adminCount = (await client.execute('SELECT COUNT(*) as count FROM admins')).rows[0].count;
  if (adminCount === 0) {
    const hash = bcrypt.hashSync('admin123', 10);
    await client.execute({
      sql: 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
      args: ['Admin', 'admin@darvelour.com', hash],
    });
    console.log('Seeded default admin: admin@darvelour.com / admin123');
  }

  console.log('Database initialized.');
}

init()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('init-db failed:', err);
    process.exit(1);
  });
