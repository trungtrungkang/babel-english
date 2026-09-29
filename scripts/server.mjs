import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' };
const allowed = new Set(['/index.html', '/src/app.js', '/src/project-docs.js', '/src/docs-view.js', '/src/domain.js', '/src/storage.js', '/src/styles.css', '/src/favicon.svg']);
createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  try {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const target = pathname === '/' ? '/index.html' : pathname;
    if (!allowed.has(target)) { res.writeHead(404); res.end('Not found'); return; }
    const data = await readFile(path.join(root, target));
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Permissions-Policy': 'microphone=(self)' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(500); res.end('Unable to load page'); }
}).listen(port, '127.0.0.1', () => console.log(`Babel Online: http://localhost:${port}`));
