import 'dotenv/config';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '../server/data/portfolio.json');

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  console.log('Connecting to Neon PostgreSQL...');
  
  // 1. Create tables
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      token_secret TEXT NOT NULL,
      last_login TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS messages (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject TEXT,
      service_category VARCHAR(255),
      message TEXT NOT NULL,
      read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS portfolio_data (
      section VARCHAR(100) PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);
  console.log('Tables created successfully.');

  // 2. Read local portfolio data to seed Neon DB
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw);

    // Seed Admin
    if (data.auth) {
      await pool.query(`
        INSERT INTO admins (username, password_hash, token_secret, last_login)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO UPDATE 
        SET password_hash = EXCLUDED.password_hash,
            token_secret = EXCLUDED.token_secret,
            last_login = EXCLUDED.last_login,
            updated_at = NOW();
      `, [
        data.auth.username || 'admin',
        data.auth.passwordHash,
        data.auth.tokenSecret,
        data.auth.lastLogin ? new Date(data.auth.lastLogin) : null
      ]);
      console.log('Admin user seeded into Neon PostgreSQL.');
    }

    // Seed Messages
    if (Array.isArray(data.messages)) {
      for (const msg of data.messages) {
        await pool.query(`
          INSERT INTO messages (id, name, email, subject, service_category, message, read, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (id) DO NOTHING;
        `, [
          msg.id,
          msg.name,
          msg.email,
          msg.subject || '',
          msg.serviceCategory || '',
          msg.message,
          Boolean(msg.read),
          msg.createdAt ? new Date(msg.createdAt) : new Date()
        ]);
      }
      console.log(`Seeded ${data.messages.length} messages into Neon PostgreSQL.`);
    }

    // Seed Portfolio sections
    const sections = ['profile', 'socials', 'services', 'skills', 'projects', 'experience', 'education', 'caseStudy', 'settings'];
    for (const sec of sections) {
      if (data[sec] !== undefined) {
        await pool.query(`
          INSERT INTO portfolio_data (section, data, updated_at)
          VALUES ($1, $2, NOW())
          ON CONFLICT (section) DO UPDATE
          SET data = EXCLUDED.data,
              updated_at = NOW();
        `, [sec, JSON.stringify(data[sec])]);
      }
    }
    console.log('Portfolio sections seeded into Neon PostgreSQL.');
  }

  // 3. Verify data in Neon DB
  const adminRes = await pool.query('SELECT id, username, last_login, created_at FROM admins');
  console.log('Admins in Neon DB:', adminRes.rows);

  const secRes = await pool.query('SELECT section, updated_at FROM portfolio_data');
  console.log('Portfolio sections in Neon DB:', secRes.rows.map(r => r.section));

  const msgRes = await pool.query('SELECT count(*) FROM messages');
  console.log('Total messages in Neon DB:', msgRes.rows[0].count);

  await pool.end();
  console.log('Migration complete!');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});

