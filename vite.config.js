import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './server/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'portfolio-api-middleware',
      configureServer(server) {
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