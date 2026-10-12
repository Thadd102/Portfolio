import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets');

async function downloadScreenshot(url, filename) {
  // WordPress mshots is a reliable, free website screenshot service:
  const screenshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1200`;
  try {
    const res = await fetch(screenshotUrl);
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      // Ensure it's an image
      if (buffer.byteLength > 5000) {
        const dest = path.join(ASSETS_DIR, filename);
        fs.writeFileSync(dest, Buffer.from(buffer));
        console.log(`Saved screenshot for ${url} -> ${filename} (${buffer.byteLength} bytes)`);
        return true;
      }
    }
  } catch (err) {
    console.error('Failed to download screenshot for', url, err.message);
  }
  return false;
}

async function main() {
  await downloadScreenshot('https://ui.shadcn.com/examples/dashboard', 'demo-dashboard.jpg');
  await downloadScreenshot('https://ui.shadcn.com/examples/tasks', 'demo-tasks.jpg');
  await downloadScreenshot('https://todomvc.com/examples/react/dist/', 'demo-todomvc.jpg');
  await downloadScreenshot('https://excalidraw.com', 'demo-excalidraw.jpg');
  await downloadScreenshot('https://reactflow.dev', 'demo-reactflow.jpg');
  await downloadScreenshot('https://threejs.org/examples/', 'demo-threejs.jpg');
}

main();
