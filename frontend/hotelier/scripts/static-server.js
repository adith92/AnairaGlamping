const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 4173;
const ROOT = process.cwd();

const routeMap = {
  '/': '/index.html',
  '/rooms': '/rooms.html',
  '/gallery': '/gallery.html',
  '/packages': '/packages.html',
  '/contact': '/contact.html',
  '/booking': '/booking.html',
  '/login': '/login.html',
  '/admin': '/admin/index.html',
  '/admin/': '/admin/index.html',
  '/admin/pms': '/admin/pms.html',
  '/admin/pms/': '/admin/pms.html',
};

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function safeResolve(urlPath) {
  const mapped = routeMap[urlPath] || urlPath;
  const normalized = path.normalize(mapped).replace(/^([.][.][/\\])+/, '');
  const rel = normalized.replace(/^[/\\]+/, '');
  const full = path.join(ROOT, rel);
  if (!full.startsWith(ROOT)) return null;
  return full;
}

const server = http.createServer((req, res) => {
  try {
    const parsed = new URL(req.url, 'http://localhost');
    let pathname = parsed.pathname;

    const filePath = safeResolve(pathname);
    if (!filePath) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden');
      return;
    }

    let target = filePath;
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      target = path.join(target, 'index.html');
    }

    fs.readFile(target, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
        return;
      }
      const ext = path.extname(target).toLowerCase();
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
      res.end(data);
    });
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Server Error');
  }
});

server.listen(PORT, () => {
  console.log('Anaira local preview running at http://localhost:4173');
});

