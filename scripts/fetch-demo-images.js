import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const demos = [
  {
    name: 'demo-dashboard.png',
    url: 'https://ui.shadcn.com/examples/dashboard',
  },
  {
    name: 'demo-tasks.png',
    url: 'https://ui.shadcn.com/examples/tasks',
  },
  {
    name: 'demo-excalidraw.png',
    url: 'https://excalidraw.com',
  },
  {
    name: 'demo-reactflow.png',
    url: 'https://reactflow.dev',
  },
  {
    name: 'demo-threejs.png',
    url: 'https://threejs.org',
  }
];

async function run() {
  for (const item of demos) {
    try {
      const res = await fetch(item.url);
      const html = await res.text();
      // look for og:image
      const ogMatch = html.match(/property="og:image"\s+content="([^"]+)"/i) 
        || html.match(/content="([^"]+)"\s+property="og:image"/i)
        || html.match(/name="twitter:image"\s+content="([^"]+)"/i);
      
      let imgUrl = ogMatch ? ogMatch[1] : null;
      if (imgUrl && !imgUrl.startsWith('http')) {
        const u = new URL(item.url);
        imgUrl = `${u.origin}${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`;
      }

      console.log(item.name, '-> og:image:', imgUrl);
      if (imgUrl) {
        const imgRes = await fetch(imgUrl);
        if (imgRes.ok) {
          const buffer = await imgRes.arrayBuffer();
          const targetPath = path.join(ASSETS_DIR, item.name);
          fs.writeFileSync(targetPath, Buffer.from(buffer));
          console.log('Saved image to', targetPath, 'Size:', buffer.byteLength);
        }
      }
    } catch (err) {
      console.error('Error for', item.url, err.message);
    }
  }
}

run();
