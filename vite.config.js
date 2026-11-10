import 'dotenv/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './server/api.js';
import { initDb } from './server/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'portfolio-api-middleware',
      async configureServer(server) {
        try {
          await initDb();
        } catch (e) {
          console.error('Failed to initialize Neon DB in Vite dev server:', e);
        }
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use('/uploads', express.static(path.resolve(__dirname, 'public/uploads')));
        app.use('/api', apiRouter);
        server.middlewares.use(app);
      }
    }
  ],
});