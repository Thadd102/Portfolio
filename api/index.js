import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiRouter from '../server/api.js';
import { initDb } from '../server/db.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serverless database initialization with caching
let isDbInitialized = false;
let dbInitPromise = null;

async function ensureDb() {
  if (isDbInitialized) return;
  if (!dbInitPromise) {
    dbInitPromise = initDb()
      .then(() => {
        isDbInitialized = true;
      })
      .catch(err => {
        console.error("Neon DB serverless init error:", err.message);
        dbInitPromise = null;
      });
  }
  return dbInitPromise;
}

app.use(async (req, res, next) => {
  await ensureDb();
  next();
});

// Support both /api/... and direct route paths on Vercel
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;

