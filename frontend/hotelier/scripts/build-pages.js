const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-content.json');
const whatsappText = 'Halo%20Anaira%20Glamping%2C%20saya%20ingin%20booking';

function readContent() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function writePage(filename, html) {
  fs.writeFileSync(path.join(root, filename), html, 'utf8');
}

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function rupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function wa(content) {
  return `https://wa.me/${esc(content.contact.whatsappInternational)}?text=${whatsappText}`;
}

function head(content, title, description) {
  return `<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="assets/brand/favicon.ico">
<link rel="apple-touch-icon" href="assets/brand/apple-touch-icon.png">
<meta property="og:image" content="assets/brand/og-anaira-glamping.jpg">
<style>
:root{--bg:#f6f1e7;--ink:#1f2421;--brand:#1b7f5a;--muted:#5f635f;--card:#fff;--dark:#1d2a25}
*{box-sizing:border-box}body{margin:0;font-family:Segoe UI,Arial,sans-serif;color:var(--ink);background:var(--bg)}
.wrap{max-width:1120px;margin:auto;padding:16px}
.nav{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.logo{height:46px;width:auto}.menu{display:flex;gap:10px;flex-wrap:wrap}.menu a{text-decoration:none;color:var(--ink);padding:8px 10px;border-radius:8px}
.btn{display:inline-block;background:var(--brand);color:#fff;text-decoration:none;padding:10px 14px;border-radius:10px;font-weight:600}
.btn.alt{background:#fff;color:var(--brand);border:1px solid var(--brand)}
.hero{position:relative;border-radius:16px;overflow:hidden}.hero img{width:100%;height:62vh;object-fit:cover;display:block}.overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,.55),rgba(0,0,0,.15));display:flex;align-items:flex-end}.copy{padding:24px;color:#fff;max-width:720px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}.card{background:var(--card);border-radius:14px;overflow:hidden;box-shadow:0 8px 22px rgba(0,0,0,.08)}.card img{width:100%;height:180px;object-fit:cover;display:block}.card .p{padding:14px}
section{margin:22px 0}h1,h2,h3{margin:.2em 0}.muted{color:var(--muted)}
.gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}.gallery a{display:block;background:#fff;border-radius:12px;overflow:hidden}.gallery img{width:100%;height:170px;object-fit:cover;display:block}
.video{background:#fff;padding:16px;border-radius:14px;box-shadow:0 8px 22px rgba(0,0,0,.08)}video{width:100%;border-radius:10px}
footer{margin-top:24px;background:var(--dark);color:#f2f4f3;border-radius:16px;padding:20px}.footer-top{display:flex;align-items:center;gap:12px}.logo-white{height:40px}
@media (max-width:700px){.hero img{height:54vh}.copy{padding:16px}.logo{height:40px}}
</style>`;
}

function nav(content) {
  return `<header class="wrap">
  <nav class="nav">
    <a href="index.html"><img class="logo" src="${esc(content.brand.logoBlack)}" alt="${esc(content.brand.name)}"></a>
    <div class="menu">
      <a href="index.html">Home</a>
      <a href="rooms.html">Rooms</a>
      <a href="gallery.html">Gallery</a>
      <a href="packages.html">Packages</a>
      <a href="contact.html">Contact</a>
      <a class="btn" href="${wa(content)}">Book via WhatsApp</a>
    </div>
  </nav>
</header>`;
}

function footer(content) {
  return `<footer class="wrap">
  <div class="footer-top">
    <img class="logo-white" src="${esc(content.brand.logoWhite)}" alt="Anaira logo white">
    <strong>${esc(content.brand.name)}</strong>
  </div>
  <p>${esc(content.contact.address)}</p>
  <p>Check-in ${esc(content.policies.checkIn)} - Check-out ${esc(content.policies.checkOut)} - ${esc(content.policies.earlyLate)} - ${esc(content.policies.cancelRefund)}</p>
  <p>Fasilitas: ${esc(content.facilities.map((item) => item.name).join(', '))}.</p>
</footer>`;
}

function layout(content, title, description, body) {
  return `<!doctype html>
<html lang="id">
<head>
${head(content, title, description)}
</head>
<body>
${nav(content)}
<main class="wrap">
${body}
</main>
${footer(content)}
</body>
</html>
`;
}

function roomCard(content, room) {
  return `<article class="card">
  <img src="${esc(room.image)}" alt="${esc(room.name)}">
  <div class="p">
    <h3>${esc(room.name)}</h3>
    <p>${esc(room.capacity)} - ${esc(room.quantity)} ${room.quantity > 1 ? 'kamar' : 'rumah'}</p>
    <p>${esc(room.facilities.join(', '))}</p>
    <p>Weekday ${rupiah(room.weekdayPrice)} - Weekend ${rupiah(room.weekendPrice)}</p>
    <p class="muted">${esc(room.description)}</p>
    <p><a class="btn" href="${wa(content)}">Book via WhatsApp</a></p>
  </div>
</article>`;
}

function buildIndex(content) {
  const facilities = content.facilities.slice(0, 3).map((item) => `<article class="card"><img src="${esc(item.image)}" alt="${esc(item.name)}"><div class="p"><h3>${esc(item.name)}</h3><p class="muted">Bagian dari pengalaman menginap di ${esc(content.brand.name)}.</p></div></article>`).join('\n');

  return layout(content, `${content.brand.name} | Home`, content.brand.description, `<section class="hero">
  <picture>
    <source media="(max-width: 700px)" srcset="assets/images/hero/hero-pool-mountain-mobile.webp">
    <img src="assets/images/hero/hero-pool-mountain-desktop.webp" alt="Kolam dan pegunungan di Anaira Glamping">
  </picture>
  <div class="overlay"><div class="copy">
    <!-- ANAIRA:BRAND_START -->
    <h1>${esc(content.brand.name)}</h1>
    <p><strong>${esc(content.brand.tagline)}</strong></p>
    <p>${esc(content.brand.description)}</p>
    <!-- ANAIRA:BRAND_END -->
    <p><a class="btn" href="${wa(content)}">Book via WhatsApp</a> <a class="btn alt" href="rooms.html">Rooms & Rates</a></p>
  </div></div>
</section>
<section>
  <h2>Fasilitas</h2>
  <!-- ANAIRA:FACILITIES_START -->
  <div class="grid">${facilities}</div>
  <!-- ANAIRA:FACILITIES_END -->
</section>
<section class="video">
  <h2>Video Anaira</h2>
  <video controls preload="metadata" muted playsinline poster="${esc(content.video.poster)}">
    <source src="${esc(content.video.src)}" type="video/mp4">
  </video>
</section>`);
}

function buildRooms(content) {
  return layout(content, `${content.brand.name} | Rooms & Rates`, 'Pilihan room Anaira Glamping lengkap dengan kapasitas, fasilitas, serta harga weekday dan weekend.', `<section><h1>Rooms & Rates</h1><p class="muted">Pilih unit sesuai kebutuhan perjalanan Anda.</p></section>
<!-- ANAIRA:ROOMS_START -->
<section class="grid">
${content.rooms.map((room) => roomCard(content, room)).join('\n')}
</section>
<!-- ANAIRA:ROOMS_END -->`);
}

function buildGallery(content) {
  const gallery = content.gallery.map((image) => `<a href="${esc(image)}"><img loading="lazy" src="${esc(image)}" alt="Gallery Anaira"></a>`).join('\n');
  return layout(content, `${content.brand.name} | Gallery`, 'Galeri Anaira Glamping & Resort.', `<section><h1>Gallery</h1><p class="muted">Suasana alami Anaira Glamping & Resort.</p></section>
<!-- ANAIRA:GALLERY_START -->
<section class="gallery">
${gallery}
</section>
<!-- ANAIRA:GALLERY_END -->
<section class="video">
  <h2>Video Tour</h2>
  <video controls preload="metadata" muted playsinline poster="${esc(content.video.poster)}">
    <source src="${esc(content.video.src)}" type="video/mp4">
  </video>
</section>`);
}

function buildPackages(content) {
  const packages = content.packages.map((item) => `<article class="card"><div class="p"><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p></div></article>`).join('\n');
  return layout(content, `${content.brand.name} | Packages`, 'Paket tambahan Anaira Glamping.', `<section><h1>Packages</h1><p class="muted">Tambahkan pengalaman terbaik untuk menginap Anda.</p></section>
<!-- ANAIRA:PACKAGES_START -->
<section class="grid">
${packages}
</section>
<!-- ANAIRA:PACKAGES_END -->
<p><a class="btn" href="${wa(content)}">Book via WhatsApp</a></p>`);
}

function buildContact(content) {
  return layout(content, `${content.brand.name} | Contact`, `Kontak dan reservasi ${content.brand.name}.`, `<!-- ANAIRA:CONTACT_START -->
<section><h1>Contact & Reservation</h1>
  <p><strong>Address:</strong> ${esc(content.contact.address)}</p>
  <p><strong>WhatsApp:</strong> ${esc(content.contact.whatsappDisplay)} / ${esc(content.contact.whatsappInternational)}</p>
  <p><a class="btn" href="${wa(content)}">Book via WhatsApp</a>
  <a class="btn alt" href="${esc(content.contact.googleMapsUrl)}" target="_blank" rel="noopener noreferrer">Buka Google Maps</a></p>
</section>
<!-- ANAIRA:CONTACT_END -->
<section class="grid">
${content.facilities.slice(0, 3).map((item) => `<article class="card"><img src="${esc(item.image)}" alt="${esc(item.name)}"><div class="p"><h3>${esc(item.name)}</h3></div></article>`).join('\n')}
</section>`);
}

function buildAll() {
  const content = readContent();
  writePage('index.html', buildIndex(content));
  writePage('rooms.html', buildRooms(content));
  writePage('gallery.html', buildGallery(content));
  writePage('packages.html', buildPackages(content));
  writePage('contact.html', buildContact(content));
  return { ok: true, pages: ['index.html', 'rooms.html', 'gallery.html', 'packages.html', 'contact.html'] };
}

if (require.main === module) {
  const result = buildAll();
  console.log(`Built ${result.pages.length} Anaira frontend pages.`);
}

module.exports = { buildAll };
