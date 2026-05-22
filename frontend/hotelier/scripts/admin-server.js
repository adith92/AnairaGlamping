const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { buildAll } = require('./build-pages');

const PORT = 4173;
const HOST = '127.0.0.1';
const ROOT = path.resolve(__dirname, '..');
const CONTENT_PATH = path.join(ROOT, 'data', 'site-content.json');
const UPLOAD_ROOT = path.join(ROOT, 'assets', 'images', 'uploads');

const routes = {
  '/': '/index.html',
  '/rooms': '/rooms.html',
  '/gallery': '/gallery.html',
  '/packages': '/packages.html',
  '/contact': '/contact.html',
  '/admin': '/admin/index.html',
  '/admin/': '/admin/index.html',
};

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function send(res, code, body, type = 'application/json; charset=utf-8') {
  res.writeHead(code, { 'Content-Type': type });
  if (Buffer.isBuffer(body) || typeof body === 'string') {
    res.end(body);
    return;
  }
  res.end(JSON.stringify(body, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 25 * 1024 * 1024) {
        reject(new Error('Request too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function safeFile(urlPath) {
  const mapped = routes[urlPath] || urlPath;
  const clean = path.normalize(mapped).replace(/^([.][.][/\\])+/, '').replace(/^[/\\]+/, '');
  const full = path.join(ROOT, clean);
  if (!full.startsWith(ROOT)) return null;
  return full;
}

function safeName(filename) {
  return path.basename(String(filename || 'upload.bin')).replace(/[^a-zA-Z0-9._-]/g, '-');
}

function safeFolder(folder) {
  return String(folder || 'general').replace(/[^a-zA-Z0-9_-]/g, '-');
}

async function handleApi(req, res, pathname) {
  if (pathname === '/api/content' && req.method === 'GET') {
    return send(res, 200, fs.readFileSync(CONTENT_PATH, 'utf8'));
  }

  if (pathname === '/api/content' && req.method === 'POST') {
    const body = await readBody(req);
    const parsed = JSON.parse(body);
    fs.writeFileSync(CONTENT_PATH, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
    return send(res, 200, { ok: true });
  }

  if (pathname === '/api/build' && req.method === 'POST') {
    return send(res, 200, buildAll());
  }

  if (pathname === '/api/upload' && req.method === 'POST') {
    const payload = JSON.parse(await readBody(req));
    const folder = safeFolder(payload.folder);
    const filename = safeName(payload.filename);
    const targetDir = path.join(UPLOAD_ROOT, folder);
    const target = path.join(targetDir, filename);

    if (!target.startsWith(UPLOAD_ROOT)) {
      return send(res, 400, { ok: false, error: 'Invalid upload path' });
    }

    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(target, Buffer.from(String(payload.base64 || ''), 'base64'));
    return send(res, 200, { ok: true, path: path.relative(ROOT, target).replace(/\\/g, '/') });
  }

  return send(res, 404, { ok: false, error: 'Unknown API endpoint' });
}

function serveStatic(res, pathname) {
  let file = safeFile(pathname);
  if (!file) return send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, 'index.html');
  }

  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, 'Not Found', 'text/plain; charset=utf-8');
    const ext = path.extname(file).toLowerCase();
    send(res, 200, data, types[ext] || 'application/octet-stream');
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const parsed = new URL(req.url, `http://${HOST}:${PORT}`);
    if (parsed.pathname.startsWith('/api/')) {
      return await handleApi(req, res, parsed.pathname);
    }
    return serveStatic(res, parsed.pathname);
  } catch (error) {
    return send(res, 500, { ok: false, error: error.message });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Anaira Admin Lite running at http://localhost:${PORT}/admin/`);
});
