import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads and static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use(express.static(path.join(__dirname, '../dist')));

// API routes
app.use('/api', apiRouter);

// SPA fallback
app.get('*', (req, res) => {
  const distIndex = path.join(__dirname, '../dist/index.html');
  res.sendFile(distIndex);
});

app.listen(PORT, () => {
  console.log(`Portfolio server listening at http://localhost:${PORT}`);
});
