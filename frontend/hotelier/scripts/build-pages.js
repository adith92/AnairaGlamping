const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'data', 'site-content.json');
const whatsappText = 'Halo%20Anaira%20Glamping%2C%20saya%20ingin%20booking';

function readContent() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function writePage(filename, html) {
  const isSubdir = filename.includes('/') || filename.includes('\\');
  const chatbotSrc = isSubdir ? '../scripts/anaira-chatbot.js' : 'scripts/anaira-chatbot.js';
  const chatbotTag = `<script src="${chatbotSrc}"></script>`;
  
  let finalHtml = html;
  if (html.includes('</body>')) {
    finalHtml = html.replace('</body>', `${chatbotTag}\n</body>`);
  } else {
    finalHtml = html + `\n${chatbotTag}`;
  }
  fs.writeFileSync(path.join(root, filename), finalHtml, 'utf8');
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

<!-- SEO & OpenGraph Meta Tags -->
<meta name="keywords" content="Anaira Glamping, Glamping Bogor, Glamping Puncak, Resort Mewah Puncak, Hotel Puncak, Staycation Alam">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="assets/brand/og-anaira-glamping.jpg">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(content.brand.name)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="assets/brand/og-anaira-glamping.jpg">
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght=300;400;500;600;700;800&display=swap');
:root {
  --bg-gradient: linear-gradient(to bottom right, #06140e, #092218, #040a08);
  --ink: #f6f1e7;
  --brand: #1b7f5a;
  --brand-hover: #146546;
  --muted: #a7eed0;
  --card: rgba(10, 46, 32, 0.45);
  --dark: rgba(6, 18, 14, 0.85);
  --border: rgba(27, 127, 90, 0.2);
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: 'Plus Jakarta Sans', Segoe UI, sans-serif;
  color: var(--ink);
  background: #06140e;
  overflow-x: hidden;
}
.wrap { max-width: 1120px; margin: auto; padding: 24px 16px; }
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  background: rgba(10, 46, 32, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  padding: 14px 24px;
  border-radius: 20px;
}
.logo { height: 46px; width: auto; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
.menu { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.menu a {
  text-decoration: none;
  color: rgba(246, 241, 231, 0.85);
  padding: 8px 14px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}
.menu a:hover {
  background: rgba(27, 127, 90, 0.25);
  color: #a7eed0;
}
.btn {
  display: inline-block;
  background: var(--brand);
  color: #fff;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  box-shadow: 0 4px 12px rgba(27, 127, 90, 0.2);
}
.btn:hover {
  background: var(--brand-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(27, 127, 90, 0.3);
}
.btn.alt {
  background: rgba(255, 255, 255, 0.08);
  color: #f6f1e7;
  border: 1px solid var(--border);
  box-shadow: none;
  backdrop-filter: blur(8px);
}
.btn.alt:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(27, 127, 90, 0.4);
}
.hero {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.hero img { width: 100%; height: 62vh; object-fit: cover; display: block; }
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(4,10,8,0.9) 20%, rgba(4,10,8,0.4) 60%, rgba(4,10,8,0.1) 100%);
  display: flex;
  align-items: flex-end;
}
.copy { padding: 32px; color: #fff; max-width: 720px; }
.copy h1 { font-size: 2.8rem; font-weight: 800; tracking-tight; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
.card {
  background: var(--card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-6px);
  border-color: rgba(27, 127, 90, 0.4);
  box-shadow: 0 12px 40px rgba(27, 127, 90, 0.15);
}
.card img { width: 100%; height: 190px; object-fit: cover; display: block; border-bottom: 1px solid var(--border); }
.card .p { padding: 20px; }
.card h3 { margin-top: 0; font-size: 1.3rem; color: #a7eed0; }
section { margin: 32px 0; }
h1, h2, h3 { margin: .2em 0; font-weight: 700; }
h2 { font-size: 1.8rem; border-left: 4px solid var(--brand); padding-left: 12px; margin-bottom: 20px; }
.muted { color: rgba(246, 241, 231, 0.65); font-size: 0.95rem; line-height: 1.5; }
.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
.gallery a {
  display: block;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.gallery a:hover {
  transform: scale(1.04);
  border-color: rgba(27, 127, 90, 0.4);
}
.gallery img { width: 100%; height: 180px; object-fit: cover; display: block; }
.video {
  background: var(--card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  padding: 24px;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
video { width: 100%; border-radius: 16px; border: 1px solid var(--border); display: block; }
footer {
  margin-top: 40px;
  background: var(--dark);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  color: rgba(246, 241, 231, 0.85);
  border-radius: 24px;
  padding: 32px 24px;
}
.footer-top { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.logo-white { height: 40px; }

/* Background animations */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 16s infinite alternate ease-in-out;
}
@keyframes float-sparkle {
  0% { transform: translateY(105vh) scale(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.7; }
  90% { opacity: 0.7; }
  100% { transform: translateY(-5vh) scale(1) rotate(360deg); opacity: 0; }
}
.animate-float-sparkle {
  animation: float-sparkle 22s infinite linear;
}
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

@media (max-width: 768px) {
  .hero img { height: 50vh; }
  .copy h1 { font-size: 2rem; }
  .copy { padding: 20px; }
  .logo { height: 40px; }
  .nav { padding: 12px 16px; }
}
</style>`;
}

function nav(content) {
  return `<header class="wrap">
  <nav class="nav">
    <a href="index.html"><img class="logo" src="${esc(content.brand.logoWhite)}" alt="${esc(content.brand.name)}"></a>
    <div class="menu">
      <a href="index.html">Home</a>
      <a href="rooms.html">Rooms</a>
      <a href="gallery.html">Gallery</a>
      <a href="packages.html">Packages</a>
      <a href="contact.html">Contact</a>
      <a href="booking.html" style="color: #a7eed0; font-weight: 600; border: 1.5px dashed rgba(27,127,90,0.5); background: rgba(27,127,90,0.15); border-radius: 12px; margin: 0 4px;">Book Online 📅</a>
      <a href="login.html" style="font-size: 0.8rem; opacity: 0.5; margin: 0 4px;" class="hover:opacity-100">Manage Booking 🔐</a>
      <a class="btn" href="contact.html">Hubungi Kami 📞</a>
      <div style="display: flex; gap: 4px; align-items: center; margin-left: 8px; border-left: 1px solid rgba(27,127,90,0.3); padding-left: 8px;">
        <button onclick="setAnairaLanguage('id')" id="lang-id" style="background: none; border: none; color: #a7eed0; font-size: 0.8rem; font-weight: 700; cursor: pointer; opacity: 1; padding: 2px 4px; font-family: inherit; transition: opacity 0.2s;">ID</button>
        <span style="opacity: 0.3; font-size: 0.8rem;">|</span>
        <button onclick="setAnairaLanguage('en')" id="lang-en" style="background: none; border: none; color: #a7eed0; font-size: 0.8rem; font-weight: 400; cursor: pointer; opacity: 0.4; padding: 2px 4px; font-family: inherit; transition: opacity 0.2s;">EN</button>
      </div>
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
<body class="min-h-screen text-[#f6f1e7] font-sans antialiased overflow-x-hidden relative">

  <!-- Premium Luxurious Background Overlay -->
  <div class="fixed inset-0 -z-50 overflow-hidden bg-gradient-to-br from-[#06140e] via-[#092218] to-[#040a08] pointer-events-none">
    <!-- Radial mesh / grid overlay -->
    <div class="absolute inset-0 bg-[radial-gradient(#1b7f5a_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.08] mix-blend-overlay"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#040a08_80%)] opacity-80"></div>
    
    <!-- Shifting animated glowing blobs -->
    <div class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#1b7f5a]/20 filter blur-[80px] md:blur-[120px] animate-blob"></div>
    <div class="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-teal-800/15 filter blur-[80px] md:blur-[120px] animate-blob animation-delay-2000"></div>
    <div class="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 filter blur-[100px] md:blur-[150px] animate-blob animation-delay-4000"></div>
    
    <!-- Floating Starry Sparkles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-1.5 h-1.5 bg-amber-400 rounded-full blur-[1px] animate-float-sparkle" style="left: 5%; animation-delay: 0s; animation-duration: 20s;"></div>
      <div class="absolute w-2 h-2 bg-emerald-300 rounded-full blur-[1px] animate-float-sparkle" style="left: 25%; animation-delay: 5s; animation-duration: 27s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-white rounded-full animate-float-sparkle" style="left: 45%; animation-delay: 9s; animation-duration: 22s;"></div>
      <div class="absolute w-2 h-2 bg-yellow-200 rounded-full blur-[1px] animate-float-sparkle" style="left: 65%; animation-delay: 3s; animation-duration: 30s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full blur-[1.5px] animate-float-sparkle" style="left: 85%; animation-delay: 7s; animation-duration: 24s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-white rounded-full animate-float-sparkle" style="left: 15%; animation-delay: 13s; animation-duration: 21s;"></div>
      <div class="absolute w-2 h-2 bg-amber-300 rounded-full blur-[1px] animate-float-sparkle" style="left: 38%; animation-delay: 11s; animation-duration: 29s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-white rounded-full blur-[1px] animate-float-sparkle" style="left: 58%; animation-delay: 15s; animation-duration: 23s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-emerald-300 rounded-full animate-float-sparkle" style="left: 75%; animation-delay: 17s; animation-duration: 26s;"></div>
    </div>
  </div>

  ${nav(content)}
  <main class="wrap">
  ${body}
  </main>
  ${footer(content)}
</body>
</html>`;
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
    <div class="flex gap-2 mt-4" style="display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap;">
      <a class="btn" href="rooms/${room.id}.html">Lihat Detail 🔍</a>
      <a class="btn alt" href="booking.html?room=${room.id}">Pesan Sekarang 📅</a>
      <a class="btn alt" href="contact.html">Hubungi Kami 📞</a>
    </div>
  </div>
</article>`;
}

function buildRoomDetailPage(content, room) {
  const images = room.images || [room.image];
  
  // Render gallery indicators and images for a premium slideshow
  const slideshowHtml = `
  <div class="relative w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 aspect-video">
    <div id="slideshow-container" class="relative w-full h-full">
      ${images.map((img, idx) => `
        <div class="slide-item absolute inset-0 transition-opacity duration-500 ease-in-out ${idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}" data-slide-index="${idx}">
          <img src="../${esc(img)}" alt="${esc(room.name)} detail ${idx + 1}" class="w-full h-full object-cover">
        </div>
      `).join('')}
    </div>
    
    <!-- Controls -->
    <button onclick="prevSlide()" class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-brand text-white p-2.5 rounded-full backdrop-blur-md transition-colors border border-white/10 active:scale-90 flex items-center justify-center">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
    </button>
    <button onclick="nextSlide()" class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-brand text-white p-2.5 rounded-full backdrop-blur-md transition-colors border border-white/10 active:scale-90 flex items-center justify-center">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
    </button>
    
    <!-- Dots Indicators -->
    <div class="absolute bottom-4 left-1/2 -translate-y-0.5 -translate-x-1/2 z-20 flex gap-2 bg-black/30 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
      ${images.map((_, idx) => `
        <button onclick="goToSlide(${idx})" class="slide-dot w-2 h-2 rounded-full transition-all ${idx === 0 ? 'bg-brand scale-125' : 'bg-white/40'}" data-slide-dot="${idx}"></button>
      `).join('')}
    </div>
  </div>
  
  <!-- Thumbnail list -->
  <div class="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
    ${images.map((img, idx) => `
      <div onclick="goToSlide(${idx})" class="thumb-item cursor-pointer rounded-xl overflow-hidden border-2 ${idx === 0 ? 'border-brand shadow-md scale-[1.02]' : 'border-white/10 hover:border-brand/40'} aspect-video transition-all duration-200" data-thumb-index="${idx}">
        <img src="../${esc(img)}" alt="Thumbnail ${idx + 1}" class="w-full h-full object-cover">
      </div>
    `).join('')}
  </div>
  `;

  const amenitiesChecklist = room.facilities.map(item => `
    <div class="flex items-center gap-2.5 bg-brand-950/20 px-4 py-3 rounded-xl border border-white/5 backdrop-blur-sm">
      <span class="w-5 h-5 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center">
        <svg class="w-3.5 h-3.5 text-emerald-400 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
      </span>
      <span class="text-sm font-semibold text-slate-200">${esc(item)}</span>
    </div>
  `).join('\n');

  const pageBody = `
  <section class="mt-4">
    <!-- Back to Rooms button -->
    <a href="../rooms.html" class="inline-flex items-center gap-2 text-brand hover:text-brand-hover text-sm font-bold transition-all hover:-translate-x-1 mb-5">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7 7-7m8 14l-7-7 7-7"/></svg>
      Kembali ke Kamar & Tarif
    </a>
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Column: Media & Descriptions (7 Cols) -->
      <div class="lg:col-span-7 space-y-6">
        <!-- Interactive Multi-Photo Gallery -->
        <div class="bg-black/15 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-3xl shadow-xl">
          <h2 class="text-xl font-serif font-bold text-white mb-4 border-l-4 border-brand pl-3 flex items-center justify-between">
            <span>Galeri Foto Premium</span>
            <span class="text-xs bg-brand/10 text-brand px-2.5 py-1 rounded-full font-sans font-semibold">${images.length} Foto</span>
          </h2>
          ${slideshowHtml}
        </div>
        
        <!-- Description -->
        <div class="bg-black/15 backdrop-blur-md border border-white/10 p-5 sm:p-6 rounded-3xl shadow-xl space-y-4">
          <h2 class="text-xl font-serif font-bold text-white border-l-4 border-brand pl-3">Deskripsi Kamar</h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">${esc(room.description)}</p>
          <div class="grid grid-cols-2 gap-4 pt-2 text-xs border-t border-white/5 mt-4">
            <div class="bg-brand-950/15 p-3 rounded-2xl border border-white/5">
              <span class="block text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Kapasitas Unit</span>
              <strong class="text-sm font-bold text-brand">${esc(room.capacity)}</strong>
            </div>
            <div class="bg-brand-950/15 p-3 rounded-2xl border border-white/5">
              <span class="block text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Ketersediaan Unit</span>
              <strong class="text-sm font-bold text-brand">${esc(room.quantity)} Unit Tersedia</strong>
            </div>
          </div>
        </div>

        <!-- Checklist Amenities -->
        <div class="bg-black/15 backdrop-blur-md border border-white/10 p-5 sm:p-6 rounded-3xl shadow-xl space-y-4">
          <h2 class="text-xl font-serif font-bold text-white border-l-4 border-brand pl-3">Fasilitas Unit</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            ${amenitiesChecklist}
          </div>
        </div>
      </div>

      <!-- Right Column: Booking Widget & Flex Pricing (5 Cols) -->
      <div class="lg:col-span-5 sticky top-24 space-y-6">
        <!-- Interactive Pricing & Availability Card -->
        <div class="bg-black/25 backdrop-blur-xl border border-white/15 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
          <div class="absolute -top-12 -left-12 w-28 h-28 bg-brand/5 rounded-full blur-xl"></div>
          
          <div class="relative z-10 space-y-5">
            <div>
              <span class="text-xs bg-brand text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">Best Rate Guarantee</span>
              <h1 class="text-3xl font-serif font-extrabold text-white tracking-tight">${esc(room.name)} Suite</h1>
            </div>

            <!-- Rate Display (Flexible Price / Promo Option) -->
            <div class="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2.5">
              <span class="block text-slate-400 uppercase tracking-wider text-[10px] font-bold">Harga Sewa Kamar</span>
              <div class="flex flex-col gap-1.5 divide-y divide-white/5">
                <div class="flex justify-between items-center py-1">
                  <span class="text-slate-300 text-sm font-medium">Weekday (Senin - Kamis):</span>
                  <div class="text-right">
                    <strong class="text-lg text-white font-serif font-bold">${rupiah(room.weekdayPrice)}</strong>
                    <span class="text-[10px] text-slate-400 block">per malam (Nett)</span>
                  </div>
                </div>
                <div class="flex justify-between items-center pt-2.5">
                  <span class="text-slate-300 text-sm font-medium">Weekend (Jumat - Minggu):</span>
                  <div class="text-right">
                    <strong class="text-lg text-white font-serif font-bold">${rupiah(room.weekendPrice)}</strong>
                    <span class="text-[10px] text-slate-400 block">per malam (Nett)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Date Checker scheduler Widget -->
            <div class="space-y-3 pt-2">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Cek Tanggal & Estimasi Harga
              </h3>
              
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div class="space-y-1">
                  <label class="block text-[10px] text-slate-400 uppercase font-semibold">Check-In</label>
                  <input type="date" id="dateCheckIn" class="w-full bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-1 focus:ring-brand focus:border-brand outline-none" min="2026-05-24">
                </div>
                <div class="space-y-1">
                  <label class="block text-[10px] text-slate-400 uppercase font-semibold">Check-Out</label>
                  <input type="date" id="dateCheckOut" class="w-full bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-1 focus:ring-brand focus:border-brand outline-none" min="2026-05-24">
                </div>
              </div>
              
              <div id="dateEstimatorBox" class="hidden bg-brand/5 border border-brand/20 p-3.5 rounded-2xl text-xs space-y-1.5 transition-all duration-200">
                <div class="flex justify-between text-slate-300 font-medium">
                  <span>Durasi Menginap:</span>
                  <strong id="estNights" class="text-brand font-bold">-</strong>
                </div>
                <div class="flex justify-between text-slate-300 font-medium">
                  <span>Estimasi Biaya:</span>
                  <strong id="estPrice" class="text-white font-bold">-</strong>
                </div>
              </div>
            </div>

            <!-- Booking buttons -->
            <div class="flex flex-col gap-3 pt-2">
              <button onclick="bookRoomOnline('${room.id}')" class="w-full py-3.5 bg-brand hover:bg-brand-hover active:scale-98 text-white font-extrabold rounded-xl shadow-lg transition-all duration-150 inline-flex items-center justify-center gap-2 text-sm flex items-center justify-center">
                Pesan Sekarang (Online) 📅
              </button>
              <a href="../contact.html" class="w-full py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-center transition-all inline-flex items-center justify-center gap-2 text-sm backdrop-blur-sm">
                Hubungi Kami 📞
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Premium Slider and Pricing Logic JavaScript -->
  <script>
    // Slide index state
    let activeSlide = 0;
    const totalSlides = ${images.length};

    function prevSlide() {
      goToSlide((activeSlide - 1 + totalSlides) % totalSlides);
    }

    function nextSlide() {
      goToSlide((activeSlide + 1) % totalSlides);
    }

    function goToSlide(idx) {
      activeSlide = idx;
      
      // Update Slide items opacity and z-index
      document.querySelectorAll('.slide-item').forEach(item => {
        const index = parseInt(item.getAttribute('data-slide-index'));
        if (index === idx) {
          item.className = "slide-item absolute inset-0 transition-opacity duration-500 ease-in-out opacity-100 z-10";
        } else {
          item.className = "slide-item absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 z-0";
        }
      });
      
      // Update dots bg color
      document.querySelectorAll('.slide-dot').forEach(dot => {
        const index = parseInt(dot.getAttribute('data-slide-dot'));
        if (index === idx) {
          dot.className = "slide-dot w-2 h-2 rounded-full transition-all bg-brand scale-125";
        } else {
          dot.className = "slide-dot w-2 h-2 rounded-full transition-all bg-white/40";
        }
      });
      
      // Update thumbnails styling
      document.querySelectorAll('.thumb-item').forEach(thumb => {
        const index = parseInt(thumb.getAttribute('data-thumb-index'));
        if (index === idx) {
          thumb.className = "thumb-item cursor-pointer rounded-xl overflow-hidden border-2 border-brand shadow-md scale-[1.02] aspect-video transition-all duration-200";
        } else {
          thumb.className = "thumb-item cursor-pointer rounded-xl overflow-hidden border-2 border-white/10 hover:border-brand/40 aspect-video transition-all duration-200";
        }
      });
    }

    // Dynamic Live Price Estimator logic
    const inInput = document.getElementById('dateCheckIn');
    const outInput = document.getElementById('dateCheckOut');
    const estBox = document.getElementById('dateEstimatorBox');
    
    // Set today limits on calendar min dates
    const today = new Date('2026-05-24'); // Fixed matching context metadata
    const todayStr = today.toISOString().slice(0, 10);
    inInput.min = todayStr;
    outInput.min = todayStr;

    inInput.addEventListener('change', () => {
      outInput.min = inInput.value;
      calculateEstimate();
    });
    outInput.addEventListener('change', calculateEstimate);

    function calculateEstimate() {
      const inVal = inInput.value;
      const outVal = outInput.value;

      if (!inVal || !outVal) {
        estBox.classList.add('hidden');
        return;
      }

      const d1 = new Date(inVal);
      const d2 = new Date(outVal);
      const diffMs = d2.getTime() - d1.getTime();
      const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (nights <= 0) {
        estBox.classList.add('hidden');
        return;
      }

      let totalRate = 0;
      let tempDate = new Date(d1);
      
      const weekdayPrice = ${room.weekdayPrice};
      const weekendPrice = ${room.weekendPrice};

      for (let i = 0; i < nights; i++) {
        const day = tempDate.getDay();
        // Weekend is Friday (5) and Saturday (6) and Sunday (0)
        if (day === 0 || day === 5 || day === 6) {
          totalRate += weekendPrice;
        } else {
          totalRate += weekdayPrice;
        }
        tempDate.setDate(tempDate.getDate() + 1);
      }

      // Add 10% tax
      const totalCost = Math.round(totalRate * 1.10);

      document.getElementById('estNights').innerText = nights + ' Malam';
      document.getElementById('estPrice').innerText = 'Rp ' + totalCost.toLocaleString('id-ID');
      estBox.classList.remove('hidden');
    }

    function bookRoomOnline(roomId) {
      const inVal = inInput.value;
      const outVal = outInput.value;
      
      let url = '../booking.html?room=' + encodeURIComponent(roomId);
      if (inVal) url += '&checkin=' + encodeURIComponent(inVal);
      if (outVal) url += '&checkout=' + encodeURIComponent(outVal);
      
      window.location.href = url;
    }
  </script>
  `;

  // Wrap in custom layout with adapted parent path prefix
  const relativeHead = `<title>Anaira Glamping & Resort | ${esc(room.name)} Suite</title>
<meta name="description" content="Rasakan kemewahan menginap di ${esc(room.name)} Suite Anaira Glamping. ${esc(room.description)}">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="../assets/brand/favicon.ico">
<link rel="apple-touch-icon" href="../assets/brand/apple-touch-icon.png">

<!-- SEO & OpenGraph Meta Tags -->
<meta name="keywords" content="Anaira Glamping, ${esc(room.name)}, Glamping Bogor, Glamping Puncak, Hotel Mewah, Resort Alam">
<meta property="og:title" content="Anaira Glamping & Resort | ${esc(room.name)} Suite">
<meta property="og:description" content="Rasakan kemewahan menginap di ${esc(room.name)} Suite Anaira Glamping. ${esc(room.description)}">
<meta property="og:image" content="../${esc(room.image)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(content.brand.name)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Anaira Glamping & Resort | ${esc(room.name)} Suite">
<meta name="twitter:description" content="Rasakan kemewahan menginap di ${esc(room.name)} Suite Anaira Glamping. ${esc(room.description)}">
<meta name="twitter:image" content="../${esc(room.image)}">
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght=300;400;500;600;700;800&display=swap');
:root {
  --bg-gradient: linear-gradient(to bottom right, #06140e, #092218, #040a08);
  --ink: #f6f1e7;
  --brand: #1b7f5a;
  --brand-hover: #146546;
  --muted: #a7eed0;
  --card: rgba(10, 46, 32, 0.45);
  --dark: rgba(6, 18, 14, 0.85);
  --border: rgba(27, 127, 90, 0.2);
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: 'Plus Jakarta Sans', Segoe UI, sans-serif;
  color: var(--ink);
  background: #06140e;
  overflow-x: hidden;
}
.wrap { max-width: 1120px; margin: auto; padding: 24px 16px; }
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  background: rgba(10, 46, 32, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  padding: 14px 24px;
  border-radius: 20px;
}
.logo { height: 46px; width: auto; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
.menu { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.menu a {
  text-decoration: none;
  color: rgba(246, 241, 231, 0.85);
  padding: 8px 14px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}
.menu a:hover {
  background: rgba(27, 127, 90, 0.25);
  color: #a7eed0;
}
.btn {
  display: inline-block;
  background: var(--brand);
  color: #fff;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  box-shadow: 0 4px 12px rgba(27, 127, 90, 0.2);
}
.btn:hover {
  background: var(--brand-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(27, 127, 90, 0.3);
}
.btn.alt {
  background: rgba(255, 255, 255, 0.08);
  color: #f6f1e7;
  border: 1px solid var(--border);
  box-shadow: none;
  backdrop-filter: blur(8px);
}
.btn.alt:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(27, 127, 90, 0.4);
}
section { margin: 32px 0; }
h1, h2, h3 { margin: .2em 0; font-weight: 700; }
h2 { font-size: 1.8rem; border-left: 4px solid var(--brand); padding-left: 12px; margin-bottom: 20px; }
.muted { color: rgba(246, 241, 231, 0.65); font-size: 0.95rem; line-height: 1.5; }
footer {
  margin-top: 40px;
  background: var(--dark);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  color: rgba(246, 241, 231, 0.85);
  border-radius: 24px;
  padding: 32px 24px;
}
.footer-top { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.logo-white { height: 40px; }

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 16s infinite alternate ease-in-out;
}
@keyframes float-sparkle {
  0% { transform: translateY(105vh) scale(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.7; }
  90% { opacity: 0.7; }
  100% { transform: translateY(-5vh) scale(1) rotate(360deg); opacity: 0; }
}
.animate-float-sparkle {
  animation: float-sparkle 22s infinite linear;
}
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

@media (max-width: 768px) {
  .logo { height: 40px; }
  .nav { padding: 12px 16px; }
}
</style>
<!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brand: '#1b7f5a',
          'brand-hover': '#146546',
          'brand-950': '#051810',
          darkbg: '#06140e'
        }
      }
    }
  }
</script>
<!-- Shared Data Library -->
<script src="../scripts/anaira-data-lib.js"></script>
`;

  const relativeNav = `<header class="wrap">
  <nav class="nav">
    <a href="../index.html"><img class="logo" src="../${esc(content.brand.logoWhite)}" alt="${esc(content.brand.name)}"></a>
    <div class="menu">
      <a href="../index.html">Home</a>
      <a href="../rooms.html">Rooms</a>
      <a href="../gallery.html">Gallery</a>
      <a href="../packages.html">Packages</a>
      <a href="../contact.html">Contact</a>
      <a href="../booking.html" style="color: #a7eed0; font-weight: 600; border: 1.5px dashed rgba(27,127,90,0.5); background: rgba(27,127,90,0.15); border-radius: 12px; margin: 0 4px;">Book Online 📅</a>
      <a href="../login.html" style="font-size: 0.8rem; opacity: 0.5; margin: 0 4px;" class="hover:opacity-100">Manage Booking 🔐</a>
      <a class="btn" href="../contact.html">Hubungi Kami 📞</a>
      <div style="display: flex; gap: 4px; align-items: center; margin-left: 8px; border-left: 1px solid rgba(27,127,90,0.3); padding-left: 8px;">
        <button onclick="setAnairaLanguage('id')" id="lang-id" style="background: none; border: none; color: #a7eed0; font-size: 0.8rem; font-weight: 700; cursor: pointer; opacity: 1; padding: 2px 4px; font-family: inherit; transition: opacity 0.2s;">ID</button>
        <span style="opacity: 0.3; font-size: 0.8rem;">|</span>
        <button onclick="setAnairaLanguage('en')" id="lang-en" style="background: none; border: none; color: #a7eed0; font-size: 0.8rem; font-weight: 400; cursor: pointer; opacity: 0.4; padding: 2px 4px; font-family: inherit; transition: opacity 0.2s;">EN</button>
      </div>
    </div>
  </nav>
</header>`;

  const relativeFooter = `<footer class="wrap">
  <div class="footer-top">
    <img class="logo-white" src="../${esc(content.brand.logoWhite)}" alt="Anaira logo white">
    <strong>${esc(content.brand.name)}</strong>
  </div>
  <p>${esc(content.contact.address)}</p>
  <p>Check-in ${esc(content.policies.checkIn)} - Check-out ${esc(content.policies.checkOut)} - ${esc(content.policies.earlyLate)} - ${esc(content.policies.cancelRefund)}</p>
  <p>Fasilitas: ${esc(content.facilities.map((item) => item.name).join(', '))}.</p>
</footer>`;

  return `<!doctype html>
<html lang="id">
<head>
${relativeHead}
</head>
<body class="min-h-screen text-[#f6f1e7] font-sans antialiased overflow-x-hidden relative font-sans">

  <!-- Premium Luxurious Background Overlay -->
  <div class="fixed inset-0 -z-50 overflow-hidden bg-gradient-to-br from-[#06140e] via-[#092218] to-[#040a08] pointer-events-none">
    <!-- Radial mesh / grid overlay -->
    <div class="absolute inset-0 bg-[radial-gradient(#1b7f5a_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.08] mix-blend-overlay"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#040a08_80%)] opacity-80"></div>
    
    <!-- Shifting animated glowing blobs -->
    <div class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#1b7f5a]/20 filter blur-[80px] md:blur-[120px] animate-blob"></div>
    <div class="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-teal-800/15 filter blur-[80px] md:blur-[120px] animate-blob animation-delay-2000"></div>
    <div class="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 filter blur-[100px] md:blur-[150px] animate-blob animation-delay-4000"></div>
    
    <!-- Floating Starry Sparkles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-1.5 h-1.5 bg-amber-400 rounded-full blur-[1px] animate-float-sparkle" style="left: 5%; animation-delay: 0s; animation-duration: 20s;"></div>
      <div class="absolute w-2 h-2 bg-emerald-300 rounded-full blur-[1px] animate-float-sparkle" style="left: 25%; animation-delay: 5s; animation-duration: 27s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-white rounded-full animate-float-sparkle" style="left: 45%; animation-delay: 9s; animation-duration: 22s;"></div>
      <div class="absolute w-2 h-2 bg-yellow-200 rounded-full blur-[1px] animate-float-sparkle" style="left: 65%; animation-delay: 3s; animation-duration: 30s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full blur-[1.5px] animate-float-sparkle" style="left: 85%; animation-delay: 7s; animation-duration: 24s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-white rounded-full animate-float-sparkle" style="left: 15%; animation-delay: 13s; animation-duration: 21s;"></div>
      <div class="absolute w-2 h-2 bg-amber-300 rounded-full blur-[1px] animate-float-sparkle" style="left: 38%; animation-delay: 11s; animation-duration: 29s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-white rounded-full blur-[1px] animate-float-sparkle" style="left: 58%; animation-delay: 15s; animation-duration: 23s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-emerald-300 rounded-full animate-float-sparkle" style="left: 75%; animation-delay: 17s; animation-duration: 26s;"></div>
    </div>
  </div>

  ${relativeNav}
  <main class="wrap">
  ${pageBody}
  </main>
  ${relativeFooter}
</body>
</html>`;
}

function buildIndex(content) {
  const facilities = content.facilities.slice(0, 3).map((item) => `<article class="card"><img src="${esc(item.image)}" alt="${esc(item.name)}"><div class="p"><h3>${esc(item.name)}</h3><p class="muted">Bagian dari pengalaman menginap di ${esc(content.brand.name)}.</p></div></article>`).join('\n');

  const dealsHtml = (content.deals || []).map((deal) => `
    <article class="card relative overflow-hidden group">
      <div style="position: absolute; top: 12px; left: 12px; background: #e11d48; color: #fff; font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 9999px; z-index: 10; box-shadow: 0 4px 6px rgba(0,0,0,0.15);" class="animate-pulse">
        PROMO SPESIAL
      </div>
      <img src="${esc(deal.bannerImage)}" alt="${esc(deal.title)}" style="height: 200px; width: 100%; object-fit: cover;">
      <div class="p" style="display: flex; flex-direction: column; gap: 8px;">
        <h3 style="color: #fff; font-size: 1.25rem; margin: 0;">${esc(deal.title)}</h3>
        <p class="muted" style="font-size: 0.85rem; line-height: 1.4; height: 60px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${esc(deal.description)}</p>
        
        <div style="background: rgba(255, 255, 255, 0.04); padding: 8px; border-radius: 12px; border: 1px solid var(--border); text-align: center; margin: 4px 0;">
          <span style="font-size: 0.7rem; color: #a7eed0; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; display: block;">Gunakan Kode Voucher:</span>
          <strong style="font-family: monospace; font-size: 1.1rem; color: #fff; background: rgba(27, 127, 90, 0.2); border: 1.5px dashed var(--brand); padding: 2px 8px; border-radius: 6px; display: inline-block; margin-top: 4px;">${esc(deal.voucherCode)}</strong>
        </div>

        <a class="btn" href="booking.html?package=${esc(deal.targetPackage)}&voucher=${esc(deal.voucherCode)}" style="text-align: center; font-size: 0.85rem; padding: 10px 14px; width: 100%;">
          Klaim Promo Spesial ➔
        </a>
      </div>
    </article>
  `).join('\n');

  const packagesHtml = (content.packages || []).map((pkg) => `
    <article class="card relative overflow-hidden group">
      <div style="position: absolute; top: 12px; left: 12px; background: var(--brand); color: #fff; font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 9999px; z-index: 10; box-shadow: 0 4px 6px rgba(0,0,0,0.15);">
        ${esc(pkg.discountLabel)}
      </div>
      <img src="${esc(pkg.bannerImage)}" alt="${esc(pkg.title)}" style="height: 200px; width: 100%; object-fit: cover;">
      <div class="p" style="display: flex; flex-direction: column; gap: 8px;">
        <h3 style="color: #a7eed0; font-size: 1.25rem; margin: 0;">${esc(pkg.title)}</h3>
        <p style="font-size: 0.95rem; font-weight: 700; color: #fff; margin: 0;">
          Harga: <span style="text-decoration: line-through; opacity: 0.5; font-size: 0.85rem; margin-right: 6px;">${rupiah(pkg.originalPrice)}</span> ${rupiah(pkg.price)}
        </p>
        <p class="muted" style="font-size: 0.85rem; line-height: 1.4; height: 60px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${esc(pkg.shortDescription)}</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px;">
          <a class="btn alt" href="packages.html#${esc(pkg.slug)}" style="text-align: center; font-size: 0.8rem; padding: 8px 10px;">
            Detail Paket
          </a>
          <a class="btn" href="${esc(pkg.bookingUrl)}" style="text-align: center; font-size: 0.8rem; padding: 8px 10px;">
            Booking Paket 📅
          </a>
        </div>
      </div>
    </article>
  `).join('\n');

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
    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px;">
      <a class="btn" href="booking.html">Pesan Online 📅</a>
      <a class="btn alt" href="contact.html">Hubungi Kami 📞</a>
      <a class="btn alt" href="rooms.html">Kamar & Tarif</a>
    </div>
  </div></div>
</section>

<!-- FEATURED DEALS SECTION -->
<section>
  <h2>Promo Spesial Anaira (Featured Deals)</h2>
  <p class="muted">Klaim penawaran terbatas kami menggunakan kode voucher eksklusif di bawah ini.</p>
  <div class="grid" style="margin-top: 20px;">
    ${dealsHtml}
  </div>
</section>

<!-- PROMO PACKAGES SECTION -->
<section>
  <h2>Paket Menginap Favorit (Promo Packages)</h2>
  <p class="muted">Pilihan paket lengkap liburan bersama keluarga atau staycation romantis Anda.</p>
  <div class="grid" style="margin-top: 20px;">
    ${packagesHtml}
  </div>
</section>

<section>
  <h2>Fasilitas</h2>
  <!-- ANAIRA:FACILITIES_START -->
  <div class="grid">${facilities}</div>
  <!-- ANAIRA:FACILITIES_END -->
</section>

<!-- WHY CHOOSE US (TRUST SECTION) -->
<section style="background: var(--card); border: 1px solid var(--border); padding: 32px; border-radius: 24px; text-align: center; margin-top: 40px; backdrop-filter: blur(12px);">
  <h2 style="border: none; padding: 0; text-align: center; margin-bottom: 24px; color: #a7eed0;">Mengapa Memilih Anaira Glamping?</h2>
  <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px;">
      <span style="font-size: 2rem;">🏕️</span>
      <h3 style="font-size: 1.05rem; margin: 0; color: #fff;">Private Glamping Experience</h3>
      <p class="muted" style="font-size: 0.8rem; margin: 0;">Suasana privat yang damai, jauh dari hiruk-pikuk kota untuk ketenangan batin Anda.</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px;">
      <span style="font-size: 2rem;">✨</span>
      <h3 style="font-size: 1.05rem; margin: 0; color: #fff;">Curated Stay Packages</h3>
      <p class="muted" style="font-size: 0.8rem; margin: 0;">Pilihan paket menginap yang dirancang khusus untuk liburan keluarga atau momen romantis.</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px;">
      <span style="font-size: 2rem;">📅</span>
      <h3 style="font-size: 1.05rem; margin: 0; color: #fff;">Easy Booking Assistance</h3>
      <p class="muted" style="font-size: 0.8rem; margin: 0;">Proses pemesanan online cepat dengan dukungan konfirmasi instan via sistem PMS.</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px;">
      <span style="font-size: 2rem;">⛰️</span>
      <h3 style="font-size: 1.05rem; margin: 0; color: #fff;">Premium Mountain Stay</h3>
      <p class="muted" style="font-size: 0.8rem; margin: 0;">Lokasi eksklusif dekat Curug Nangka dengan pemandangan pegunungan dan udara segar alami.</p>
    </div>
  </div>
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
  const gallery = content.gallery.map((image, idx) => `<a href="javascript:void(0)" onclick="openLightbox(${idx})"><img loading="lazy" src="${esc(image)}" alt="Gallery Anaira"></a>`).join('\n');
  return layout(content, `${content.brand.name} | Gallery`, 'Galeri Anaira Glamping & Resort.', `<section><h1>Gallery</h1><p class="muted">Suasana alami Anaira Glamping & Resort.</p></section>
<!-- ANAIRA:GALLERY_START -->
<section class="gallery">
${gallery}
</section>
<!-- ANAIRA:GALLERY_END -->

<!-- Fullscreen Lightbox Modal -->
<div id="gallery-lightbox" style="position: fixed; inset: 0; background: rgba(4, 10, 8, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 9999; display: none; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; outline: none;" role="dialog" aria-modal="true" aria-label="Pratampil Galeri Foto Anaira" tabindex="-1">
  <div id="lightbox-loader" style="position: absolute; width: 40px; height: 40px; border: 3px solid rgba(27,127,90,0.2); border-top-color: var(--brand); border-radius: 50%; animation: spin 1s infinite linear;"></div>
  <div style="position: relative; max-width: 90vw; max-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <img id="lightbox-img" src="" alt="Pratampil Gambar" style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 16px; border: 1px solid var(--border); box-shadow: 0 20px 50px rgba(0,0,0,0.5); opacity: 0; transform: scale(0.95); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">
    <div id="lightbox-caption" style="margin-top: 16px; text-align: center; color: #a7eed0; font-size: 0.95rem; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.5);"></div>
  </div>
  <button id="lightbox-close" onclick="closeLightbox()" style="position: absolute; top: 24px; right: 24px; background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: #fff; border-radius: 50%; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; outline: none; font-size: 1.25rem;" aria-label="Tutup Galeri">✕</button>
  <button id="lightbox-prev" onclick="prevImage()" style="position: absolute; left: 24px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: #fff; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; outline: none;" aria-label="Foto Sebelumnya">
    <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
  </button>
  <button id="lightbox-next" onclick="nextImage()" style="position: absolute; right: 24px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: #fff; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; outline: none;" aria-label="Foto Berikutnya">
    <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
  </button>
  <div style="position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px; background: rgba(10, 46, 32, 0.7); border: 1px solid var(--border); padding: 8px 18px; border-radius: 9999px; backdrop-filter: blur(8px);">
    <button id="lightbox-play" onclick="toggleSlideshow()" style="background: var(--brand); border: none; color: #fff; font-size: 0.85rem; font-weight: 700; padding: 6px 14px; border-radius: 9999px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 6px;">
      <span>▶ Play Slideshow</span>
    </button>
    <span id="slideshow-status" style="font-size: 0.8rem; color: rgba(246, 241, 231, 0.7); align-self: center;">Slide otomatis mati</span>
  </div>
</div>

<style>
@keyframes spin {
  to { transform: rotate(360deg); }
}
#gallery-lightbox button:hover {
  background: var(--brand) !important;
  border-color: transparent !important;
  transform: scale(1.08) !important;
}
#lightbox-prev:active, #lightbox-next:active {
  transform: translateY(-50%) scale(0.95) !important;
}
</style>

<script>
  let galleryImages = ${JSON.stringify(content.gallery)};
  let activeIndex = 0;
  let slideshowInterval = null;
  let slideshowRunning = false;

  function openLightbox(idx) {
    activeIndex = idx;
    const lightbox = document.getElementById('gallery-lightbox');
    lightbox.style.display = 'flex';
    lightbox.focus();
    setTimeout(() => {
      lightbox.style.opacity = '1';
    }, 50);
    loadImage(idx);
  }

  function closeLightbox() {
    stopSlideshow();
    const lightbox = document.getElementById('gallery-lightbox');
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300);
  }

  function loadImage(idx) {
    const imgElement = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const loader = document.getElementById('lightbox-loader');
    
    loader.style.display = 'block';
    imgElement.style.opacity = '0';
    imgElement.style.transform = 'scale(0.95)';
    
    const path = galleryImages[idx];
    imgElement.src = path;
    
    imgElement.onload = () => {
      loader.style.display = 'none';
      imgElement.style.opacity = '1';
      imgElement.style.transform = 'scale(1)';
      const basename = path.split('/').pop().split('.').shift().replace(/-/g, ' ').toUpperCase();
      caption.innerText = basename + ' - ANAIRA GLAMPING & RESORT';
    };
  }

  function nextImage() {
    activeIndex = (activeIndex + 1) % galleryImages.length;
    loadImage(activeIndex);
  }

  function prevImage() {
    activeIndex = (activeIndex - 1 + galleryImages.length) % galleryImages.length;
    loadImage(activeIndex);
  }

  function toggleSlideshow() {
    if (slideshowRunning) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  }

  function startSlideshow() {
    slideshowRunning = true;
    document.getElementById('lightbox-play').innerHTML = '<span>⏸ Pause Slideshow</span>';
    document.getElementById('lightbox-play').style.backgroundColor = '#b91c1c';
    document.getElementById('slideshow-status').innerText = 'Slide berjalan (4s)';
    slideshowInterval = setInterval(() => {
      nextImage();
    }, 4000);
  }

  function stopSlideshow() {
    slideshowRunning = false;
    document.getElementById('lightbox-play').innerHTML = '<span>▶ Play Slideshow</span>';
    document.getElementById('lightbox-play').style.backgroundColor = 'var(--brand)';
    document.getElementById('slideshow-status').innerText = 'Slide otomatis mati';
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
    }
  }

  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox && lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  });
</script>

<section class="video">
  <h2>Video Tour</h2>
  <video controls preload="metadata" muted playsinline poster="${esc(content.video.poster)}">
    <source src="${esc(content.video.src)}" type="video/mp4">
  </video>
</section>`);
}

function buildPackages(content) {
  const packagesHtml = (content.packages || []).map((pkg) => {
    const includedItemsList = (pkg.includedItems || []).map(item => `
      <li style="display: flex; items-center; gap: 8px; font-size: 0.85rem; color: #f6f1e7; margin: 4px 0;">
        <span style="color: var(--brand); font-weight: 700; margin-right: 8px;">✓</span> ${esc(item)}
      </li>
    `).join('\n');
    
    const foodMenuHtml = (pkg.foodMenu || []).length > 0 ? `
      <div style="background: rgba(27, 127, 90, 0.1); border: 1.5px dashed var(--border); padding: 14px; border-radius: 16px; margin: 12px 0;">
        <h4 style="margin: 0 0 6px 0; color: #a7eed0; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">🍽️ Paket Menu Makanan:</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${(pkg.foodMenu || []).map(food => `<li style="font-size: 0.8rem; opacity: 0.9;">🔥 ${esc(food)}</li>`).join('\n')}
        </ul>
      </div>
    ` : '';

    return `
    <article id="${esc(pkg.slug)}" class="card" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; padding: 24px; margin-bottom: 32px; background: var(--card); border: 1px solid var(--border); border-radius: 24px; backdrop-filter: blur(12px);">
      <div style="border-radius: 16px; overflow: hidden; border: 1px solid var(--border); position: relative; height: 100%; min-height: 240px;">
        <img src="${esc(pkg.bannerImage)}" alt="${esc(pkg.title)}" style="width: 100%; height: 100%; object-fit: cover;">
        <div style="position: absolute; top: 12px; left: 12px; background: #e11d48; color: #fff; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px; box-shadow: 0 4px 6px rgba(0,0,0,0.15);">
          ${esc(pkg.discountLabel)}
        </div>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 14px;">
        <div>
          <h2 style="border: none; padding: 0; font-size: 1.6rem; color: #fff; margin-bottom: 6px;">${esc(pkg.title)}</h2>
          <div style="display: flex; gap: 8px; align-items: baseline; margin-bottom: 12px;">
            <span style="text-decoration: line-through; opacity: 0.5; font-size: 1rem; color: #f6f1e7;">${rupiah(pkg.originalPrice)}</span>
            <strong style="font-size: 1.7rem; color: #a7eed0; font-serif">${rupiah(pkg.price)}</strong>
            <span style="font-size: 0.8rem; opacity: 0.6;">(Nett)</span>
          </div>
          <p class="muted" style="font-size: 0.9rem; line-height: 1.5; margin-bottom: 12px;">${esc(pkg.fullDescription)}</p>
          
          <h4 style="margin: 12px 0 6px 0; color: #fff; font-size: 0.95rem;">🎁 Sudah Termasuk (Inclusions):</h4>
          <ul style="list-style: none; padding: 0; margin: 0 0 12px 0;">
            ${includedItemsList}
          </ul>
          
          ${foodMenuHtml}
          
          <p style="font-size: 0.75rem; opacity: 0.5; font-style: italic; margin-top: 10px;">
            * Syarat & Ketentuan: ${esc(pkg.terms)}
          </p>
        </div>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a class="btn" href="${esc(pkg.bookingUrl)}" style="flex: 1; min-width: 160px; text-align: center; padding: 12px 18px; font-weight: 700;">
            Booking Paket Ini 📅
          </a>
          <a class="btn alt" href="contact.html" style="text-align: center; padding: 12px 18px;">
            Tanya Info Lengkap
          </a>
        </div>
      </div>
    </article>
    `;
  }).join('\n');

  return layout(content, `${content.brand.name} | Packages`, 'Daftar paket promo staycation glamping premium terbaik dekat Curug Nangka.', `<section><h1>Paket Promo Staycation</h1><p class="muted">Pilih paket promo staycation eksklusif Anaira Glamping dengan harga dan fasilitas terbaik.</p></section>
<!-- ANAIRA:PACKAGES_START -->
<section style="margin-top: 24px;">
${packagesHtml}
</section>
<!-- ANAIRA:PACKAGES_END -->`);
}

function buildContact(content) {
  let mapHtml = '';
  const defaultEmbed = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.9157297394593!2d106.7909337!3d-6.6573359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69cf2454b03657%3A0xea8dbda09cfeb5ad!2sAnaira%20Glamping%20%26%20Resort!5e0!3m2!1sid!2sid!4v1716656754000!5m2!1sid!2sid`;
  
  let embedUrl = defaultEmbed;
  if (content.contact.googleMapsUrl) {
    if (content.contact.googleMapsUrl.includes('google.com/maps/embed')) {
      embedUrl = content.contact.googleMapsUrl;
    } else if (content.contact.googleMapsUrl.includes('<iframe')) {
      const match = content.contact.googleMapsUrl.match(/src="([^"]+)"/);
      if (match) embedUrl = match[1];
    }
  }

  mapHtml = `
  <div class="map-container" style="margin-top: 24px; border-radius: 20px; overflow: hidden; border: 1px solid var(--border); background: var(--card); box-shadow: 0 8px 32px rgba(0,0,0,0.2); height: 400px; position: relative;">
    <iframe src="${esc(embedUrl)}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
  <p style="text-align: center; margin-top: 16px;">
    <a href="${esc(content.contact.googleMapsUrl || 'https://maps.app.goo.gl/YVSmNtEsiK9tQNRS6')}" target="_blank" rel="noopener noreferrer" class="btn alt" style="font-size: 0.85rem; padding: 10px 20px;">
      Buka di Google Maps ↗
    </a>
  </p>`;

  return layout(content, `${content.brand.name} | Contact`, `Kontak dan reservasi ${content.brand.name}.`, `<!-- ANAIRA:CONTACT_START -->
<section><h1>Contact & Reservation</h1>
  <p><strong>Address:</strong> ${esc(content.contact.address)}</p>
  <p><strong>WhatsApp:</strong> ${esc(content.contact.whatsappDisplay)} / ${esc(content.contact.whatsappInternational)}</p>
  <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px;">
    <a class="btn" href="booking.html">Book Online 📅</a>
    <a class="btn alt" href="${wa(content)}">WhatsApp Utama</a>
  </div>
  ${mapHtml}
</section>
<!-- ANAIRA:CONTACT_END -->
<section class="grid">
${content.facilities.slice(0, 3).map((item) => `<article class="card"><img src="${esc(item.image)}" alt="${esc(item.name)}"><div class="p"><h3>${esc(item.name)}</h3></div></article>`).join('\n')}
</section>`);
}

function buildPromo(content) {
  const packagesHtml = (content.packages || []).map((pkg) => {
    const includedItemsList = (pkg.includedItems || []).slice(0, 3).map(item => `
      <li style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #f6f1e7; margin: 4px 0;">
        <span style="color: var(--brand); font-weight: 700; margin-right: 8px;">✓</span> ${esc(item)}
      </li>
    `).join('\n');
    
    let landingUrl = 'packages.html';
    if (pkg.slug.includes('lebaran')) landingUrl = 'promo/lebaran';
    else if (pkg.slug.includes('honeymoon')) landingUrl = 'promo/honeymoon';
    else if (pkg.slug.includes('bbq')) landingUrl = 'promo/bbq';
    else if (pkg.slug.includes('adventure')) landingUrl = 'promo/family';

    return `
    <article class="card relative overflow-hidden group" style="display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; transition: all 0.3s ease;">
      <div style="position: absolute; top: 12px; left: 12px; background: #e11d48; color: #fff; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px; z-index: 10; box-shadow: 0 4px 6px rgba(0,0,0,0.15);" class="animate-pulse">
        ${esc(pkg.discountLabel)}
      </div>
      <div style="height: 200px; overflow: hidden; border-bottom: 1px solid var(--border);">
        <img src="${esc(pkg.bannerImage)}" alt="${esc(pkg.title)}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" class="group-hover:scale-105">
      </div>
      <div class="p" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1; gap: 12px;">
        <div>
          <h3 style="color: #fff; font-size: 1.25rem; margin: 0 0 6px 0;">${esc(pkg.title)}</h3>
          
          <div style="display: flex; gap: 8px; align-items: baseline; margin-bottom: 10px;">
            <span style="text-decoration: line-through; opacity: 0.5; font-size: 0.85rem; color: #f6f1e7;">${rupiah(pkg.originalPrice)}</span>
            <strong style="font-size: 1.3rem; color: #a7eed0; font-serif">${rupiah(pkg.price)}</strong>
            <span style="font-size: 0.75rem; opacity: 0.6;">(Nett)</span>
          </div>

          <p class="muted" style="font-size: 0.85rem; line-height: 1.4; margin-bottom: 12px; height: 50px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${esc(pkg.shortDescription)}</p>
          
          <ul style="list-style: none; padding: 0; margin: 0 0 12px 0;">
            ${includedItemsList}
          </ul>

          <div style="background: rgba(255, 255, 255, 0.04); padding: 8px; border-radius: 12px; border: 1px solid var(--border); text-align: center; margin: 8px 0;">
            <span style="font-size: 0.7rem; color: #a7eed0; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; display: block;">Gunakan Kode Voucher:</span>
            <strong style="font-family: monospace; font-size: 1rem; color: #fff; background: rgba(27, 127, 90, 0.2); border: 1.5px dashed var(--brand); padding: 2px 8px; border-radius: 6px; display: inline-block; margin-top: 4px;">${esc(pkg.voucherCode)}</strong>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 8px; margin-top: auto;">
          <a class="btn alt" href="${esc(landingUrl)}" style="text-align: center; font-size: 0.8rem; padding: 10px 8px; border-radius: 10px; font-weight: 600;">
            Detail Promo
          </a>
          <a class="btn" href="booking.html?package=${esc(pkg.slug)}&voucher=${esc(pkg.voucherCode)}" style="text-align: center; font-size: 0.8rem; padding: 10px 8px; border-radius: 10px; font-weight: 700;">
            Booking Paket 📅
          </a>
        </div>
      </div>
    </article>
    `;
  }).join('\n');

  return layout(content, `${content.brand.name} | Staycation Promo Catalog`, 'Daftar paket promo staycation eksklusif di Anaira Glamping. Dapatkan potongan harga dan fasilitas premium.', `<section>
    <h1>Katalog Promo Staycation</h1>
    <p class="muted">Dapatkan penawaran staycation terbaik dekat Curug Nangka untuk liburan tak terlupakan Anda bersama orang terkasih.</p>
  </section>
  <section class="grid" style="margin-top: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
    ${packagesHtml}
  </section>
  <section style="background: var(--card); border: 1px solid var(--border); padding: 32px; border-radius: 24px; text-align: center; margin-top: 40px; backdrop-filter: blur(12px);">
    <h2 style="border: none; padding: 0; text-align: center; margin-bottom: 12px; color: #a7eed0;">Cara Mengklaim Promo Staycation</h2>
    <p class="muted" style="max-width: 600px; margin: auto; margin-bottom: 24px;">Ikuti langkah mudah berikut untuk mengamankan paket promo Anda secara instan.</p>
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
      <div style="padding: 16px;">
        <span style="font-size: 1.5rem; display: block; margin-bottom: 8px;">1. Pilih Paket</span>
        <p class="muted" style="font-size: 0.8rem; margin: 0;">Telusuri katalog promo kami dan tentukan paket staycation impian Anda.</p>
      </div>
      <div style="padding: 16px;">
        <span style="font-size: 1.5rem; display: block; margin-bottom: 8px;">2. Salin Voucher</span>
        <p class="muted" style="font-size: 0.8rem; margin: 0;">Gunakan kode voucher eksklusif yang tertera untuk mendapatkan diskon langsung.</p>
      </div>
      <div style="padding: 16px;">
        <span style="font-size: 1.5rem; display: block; margin-bottom: 8px;">3. Booking Instan</span>
        <p class="muted" style="font-size: 0.8rem; margin: 0;">Klik booking untuk langsung mengisi paket & voucher pada halaman pemesanan otomatis.</p>
      </div>
    </div>
  </section>`);
}

function buildPromoLandingPage(content, pkg) {
  const inclusionsHtml = (pkg.includedItems || []).map(item => `
    <li class="flex items-start gap-3 text-slate-200 text-sm sm:text-base leading-relaxed">
      <span class="w-6 h-6 rounded-full bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-center shrink-0 mt-0.5 shadow-md">
        <svg class="w-3.5 h-3.5 text-emerald-400 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
      </span>
      <span class="font-medium">${esc(item)}</span>
    </li>
  `).join('\n');

  const foodHtml = (pkg.foodMenu || []).map(food => `
    <li class="flex items-center gap-2.5 bg-brand-950/20 px-4 py-3 rounded-xl border border-white/5 backdrop-blur-sm shadow-sm transition-all hover:border-brand/35">
      <span class="text-emerald-400 font-bold text-base shrink-0">🍽️</span>
      <span class="text-sm font-semibold text-slate-300">${esc(food)}</span>
    </li>
  `).join('\n');

  const durationText = pkg.includedItems.some(i => i.toLowerCase().includes('2 malam')) ? '2 Malam' : '1 Malam';

  const seoTitle = `${pkg.title} | Promo Anaira Glamping`;
  const seoDesc = `${pkg.shortDescription} Dapatkan penawaran terbatas staycation ${durationText} hanya dengan ${rupiah(pkg.price)} nett!`;

  const pageBody = `
  <section class="mt-4">
    <a href="../promo" class="inline-flex items-center gap-2 text-brand hover:text-brand-hover text-sm font-bold transition-all hover:-translate-x-1 mb-5">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7 7-7m8 14l-7-7 7-7"/></svg>
      Kembali ke Katalog Promo
    </a>
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div class="lg:col-span-7 space-y-6">
        <div class="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[16/10] sm:aspect-video group">
          <img src="../${esc(pkg.bannerImage)}" alt="${esc(pkg.title)}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105">
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
          
          <div class="absolute bottom-6 left-6 right-6 space-y-2">
            <span class="inline-block bg-rose-600 text-white font-extrabold text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              ${esc(pkg.discountLabel)} SPECIAL DEALS
            </span>
            <h1 class="text-2xl sm:text-4xl font-serif font-extrabold text-white tracking-tight leading-tight">${esc(pkg.title)}</h1>
            <p class="text-slate-300 text-xs sm:text-sm font-semibold opacity-90">${durationText} Staycation Premium</p>
          </div>
        </div>
        
        <div class="bg-black/15 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
          <h2 class="text-xl sm:text-2xl font-bold text-white border-l-4 border-brand pl-3">Tentang Paket Ini</h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">${esc(pkg.fullDescription)}</p>
          
          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 mt-4">
            <div class="bg-brand-950/15 p-4 rounded-2xl border border-white/5">
              <span class="block text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Durasi Menginap</span>
              <strong class="text-base sm:text-lg font-bold text-brand">${durationText}</strong>
            </div>
            <div class="bg-brand-950/15 p-4 rounded-2xl border border-white/5">
              <span class="block text-slate-400 uppercase tracking-wider text-[10px] mb-0.5">Periode Menginap</span>
              <strong class="text-xs sm:text-sm font-bold text-brand">Hingga Dec 2026</strong>
            </div>
          </div>
        </div>

        <div class="bg-black/15 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl space-y-5">
          <h2 class="text-xl sm:text-2xl font-bold text-white border-l-4 border-brand pl-3">Apa Saja Yang Termasuk (Inclusions)?</h2>
          <ul class="space-y-3">
            ${inclusionsHtml}
          </ul>
        </div>

        ${(pkg.foodMenu || []).length > 0 ? `
        <div class="bg-black/15 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl space-y-5">
          <h2 class="text-xl sm:text-2xl font-bold text-white border-l-4 border-brand pl-3">🍽️ Spesial Menu Makanan Termasuk</h2>
          <p class="text-slate-400 text-xs sm:text-sm -mt-2">Nikmati hidangan kuliner pilihan khas Anaira Glamping secara privat.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            ${foodHtml}
          </div>
        </div>
        ` : ''}
      </div>

      <div class="lg:col-span-5 sticky top-24 space-y-6">
        <div class="bg-black/25 backdrop-blur-xl border border-white/15 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div class="absolute -top-12 -left-12 w-28 h-28 bg-brand/5 rounded-full blur-xl"></div>
          
          <div class="relative z-10 space-y-6">
            <div>
              <span class="text-[10px] bg-brand text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2.5 inline-block">Best Value Guaranteed</span>
              <h3 class="text-lg text-slate-300 font-semibold">Harga Promo Spesial</h3>
            </div>

            <div class="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-1">
              <span class="block text-slate-400 uppercase tracking-wider text-[10px] font-bold">Harga Normal Paket</span>
              <span class="text-lg sm:text-xl text-slate-500 line-through font-bold">${rupiah(pkg.originalPrice)}</span>
              
              <div class="pt-3 border-t border-white/5 mt-3 space-y-0.5">
                <span class="block text-slate-400 uppercase tracking-wider text-[10px] font-bold">Harga Promo (Nett)</span>
                <div class="flex items-baseline gap-2">
                  <strong class="text-3xl sm:text-4xl text-emerald-400 font-serif font-black tracking-tight">${rupiah(pkg.price)}</strong>
                  <span class="text-xs text-slate-400 font-semibold">/ Paket</span>
                </div>
              </div>
            </div>

            <div class="relative bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border-2 border-dashed border-emerald-500/40 p-5 rounded-2xl text-center space-y-3 overflow-hidden shadow-inner group">
              <div class="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 bg-[#06140e] rounded-full border-r border-white/10"></div>
              <div class="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 bg-[#06140e] rounded-full border-l border-white/10"></div>
              
              <span class="block text-[10px] text-emerald-300 uppercase font-black tracking-widest">KODE VOUCHER EKSKLUSIF</span>
              
              <div>
                <strong id="voucherCodeText" class="font-mono text-2xl sm:text-3xl text-white tracking-widest bg-emerald-900/40 border border-emerald-500/30 px-5 py-2 rounded-xl inline-block select-all transition-all duration-200 group-hover:border-emerald-400 group-hover:shadow-md">
                  ${esc(pkg.voucherCode)}
                </strong>
              </div>
              
              <p class="text-[10px] text-slate-400">Gunakan kode di atas pada saat pemesanan untuk mendapatkan diskon langsung.</p>
              
              <button onclick="copyVoucherToClipboard()" class="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline transition-colors focus:outline-none">
                Salin Kode Voucher 📋
              </button>
              <div id="copyFeedback" class="hidden text-emerald-400 font-bold text-xs animate-bounce mt-1">Berhasil Disalin!</div>
            </div>

            <div class="space-y-3.5 pt-2">
              <a href="../booking.html?package=${esc(pkg.slug)}&voucher=${esc(pkg.voucherCode)}" class="w-full py-4 bg-brand hover:bg-brand-hover active:scale-98 text-white text-center font-black rounded-xl shadow-xl transition-all duration-150 inline-flex items-center justify-center gap-2 text-base flex items-center justify-center">
                Booking Paket Ini 📅
              </a>
              <a href="https://wa.me/${esc(content.contact.whatsappInternational)}?text=Halo%20Anaira%20Glamping%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(pkg.title)}" target="_blank" rel="noopener noreferrer" class="w-full py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-center transition-all inline-flex items-center justify-center gap-2 text-sm backdrop-blur-sm">
                Tanya WhatsApp Admin 🟢
              </a>
            </div>
            
            <div class="text-[10px] text-slate-500 font-medium leading-relaxed bg-black/10 p-4 rounded-xl border border-white/5">
              <strong class="text-slate-400 uppercase tracking-wider block mb-1">Syarat & Ketentuan:</strong>
              ${esc(pkg.terms)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script>
    function copyVoucherToClipboard() {
      const voucherText = "${esc(pkg.voucherCode)}";
      navigator.clipboard.writeText(voucherText).then(() => {
        const feedback = document.getElementById('copyFeedback');
        feedback.classList.remove('hidden');
        setTimeout(() => {
          feedback.classList.add('hidden');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  </script>
  `;

  const relativeHead = `<title>${esc(seoTitle)}</title>
<meta name="description" content="${esc(seoDesc)}">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="../assets/brand/favicon.ico">
<link rel="apple-touch-icon" href="../assets/brand/apple-touch-icon.png">

<!-- SEO & OpenGraph Meta Tags -->
<meta name="keywords" content="Anaira Glamping, ${esc(pkg.title)}, Staycation Bogor, Glamping Murah Bogor, Liburan Keluarga Puncak, Resort Mewah">
<meta property="og:title" content="${esc(seoTitle)}">
<meta property="og:description" content="${esc(seoDesc)}">
<meta property="og:image" content="../${esc(pkg.bannerImage)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(content.brand.name)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(seoTitle)}">
<meta name="twitter:description" content="${esc(seoDesc)}">
<meta name="twitter:image" content="../${esc(pkg.bannerImage)}">
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght=300;400;500;600;700;800&display=swap');
:root {
  --bg-gradient: linear-gradient(to bottom right, #06140e, #092218, #040a08);
  --ink: #f6f1e7;
  --brand: #1b7f5a;
  --brand-hover: #146546;
  --muted: #a7eed0;
  --card: rgba(10, 46, 32, 0.45);
  --dark: rgba(6, 18, 14, 0.85);
  --border: rgba(27, 127, 90, 0.2);
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: 'Plus Jakarta Sans', Segoe UI, sans-serif;
  color: var(--ink);
  background: #06140e;
  overflow-x: hidden;
}
.wrap { max-width: 1120px; margin: auto; padding: 24px 16px; }
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  background: rgba(10, 46, 32, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  padding: 14px 24px;
  border-radius: 20px;
}
.logo { height: 46px; width: auto; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
.menu { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.menu a {
  text-decoration: none;
  color: rgba(246, 241, 231, 0.85);
  padding: 8px 14px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}
.menu a:hover {
  background: rgba(27, 127, 90, 0.25);
  color: #a7eed0;
}
.btn {
  display: inline-block;
  background: var(--brand);
  color: #fff;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  box-shadow: 0 4px 12px rgba(27, 127, 90, 0.2);
}
.btn:hover {
  background: var(--brand-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(27, 127, 90, 0.3);
}
.btn.alt {
  background: rgba(255, 255, 255, 0.08);
  color: #f6f1e7;
  border: 1px solid var(--border);
  box-shadow: none;
  backdrop-filter: blur(8px);
}
.btn.alt:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(27, 127, 90, 0.4);
}
section { margin: 32px 0; }
h1, h2, h3 { margin: .2em 0; font-weight: 700; }
h2 { font-size: 1.8rem; border-left: 4px solid var(--brand); padding-left: 12px; margin-bottom: 20px; }
.muted { color: rgba(246, 241, 231, 0.65); font-size: 0.95rem; line-height: 1.5; }
footer {
  margin-top: 40px;
  background: var(--dark);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  color: rgba(246, 241, 231, 0.85);
  border-radius: 24px;
  padding: 32px 24px;
}
.footer-top { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.logo-white { height: 40px; }

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 16s infinite alternate ease-in-out;
}
@keyframes float-sparkle {
  0% { transform: translateY(105vh) scale(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.7; }
  90% { opacity: 0.7; }
  100% { transform: translateY(-5vh) scale(1) rotate(360deg); opacity: 0; }
}
.animate-float-sparkle {
  animation: float-sparkle 22s infinite linear;
}
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

@media (max-width: 768px) {
  .logo { height: 40px; }
  .nav { padding: 12px 16px; }
}
</style>
<!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brand: '#1b7f5a',
          'brand-hover': '#146546',
          'brand-950': '#051810',
          darkbg: '#06140e'
        }
      }
    }
  }
</script>
<!-- Shared Data Library -->
<script src="../scripts/anaira-data-lib.js"></script>
`;

  const relativeNav = `<header class="wrap">
  <nav class="nav">
    <a href="../index.html"><img class="logo" src="../${esc(content.brand.logoWhite)}" alt="${esc(content.brand.name)}"></a>
    <div class="menu">
      <a href="../index.html">Home</a>
      <a href="../rooms.html">Rooms</a>
      <a href="../gallery.html">Gallery</a>
      <a href="../packages.html">Packages</a>
      <a href="../contact.html">Contact</a>
      <a href="../booking.html" style="color: #a7eed0; font-weight: 600; border: 1.5px dashed rgba(27,127,90,0.5); background: rgba(27,127,90,0.15); border-radius: 12px; margin: 0 4px;">Book Online 📅</a>
      <a href="../login.html" style="font-size: 0.8rem; opacity: 0.5; margin: 0 4px;" class="hover:opacity-100">Manage Booking 🔐</a>
      <a class="btn" href="../contact.html">Hubungi Kami 📞</a>
      <div style="display: flex; gap: 4px; align-items: center; margin-left: 8px; border-left: 1px solid rgba(27,127,90,0.3); padding-left: 8px;">
        <button onclick="setAnairaLanguage('id')" id="lang-id" style="background: none; border: none; color: #a7eed0; font-size: 0.8rem; font-weight: 700; cursor: pointer; opacity: 1; padding: 2px 4px; font-family: inherit; transition: opacity 0.2s;">ID</button>
        <span style="opacity: 0.3; font-size: 0.8rem;">|</span>
        <button onclick="setAnairaLanguage('en')" id="lang-en" style="background: none; border: none; color: #a7eed0; font-size: 0.8rem; font-weight: 400; cursor: pointer; opacity: 0.4; padding: 2px 4px; font-family: inherit; transition: opacity 0.2s;">EN</button>
      </div>
    </div>
  </nav>
</header>`;

  const relativeFooter = `<footer class="wrap">
  <div class="footer-top">
    <img class="logo-white" src="../${esc(content.brand.logoWhite)}" alt="Anaira logo white">
    <strong>${esc(content.brand.name)}</strong>
  </div>
  <p>${esc(content.contact.address)}</p>
  <p>Check-in ${esc(content.policies.checkIn)} - Check-out ${esc(content.policies.checkOut)} - ${esc(content.policies.earlyLate)} - ${esc(content.policies.cancelRefund)}</p>
  <p>Fasilitas: ${esc(content.facilities.map((item) => item.name).join(', '))}.</p>
</footer>`;

  return `<!doctype html>
<html lang="id">
<head>
${relativeHead}
</head>
<body class="min-h-screen text-[#f6f1e7] font-sans antialiased overflow-x-hidden relative font-sans">

  <!-- Premium Luxurious Background Overlay -->
  <div class="fixed inset-0 -z-50 overflow-hidden bg-gradient-to-br from-[#06140e] via-[#092218] to-[#040a08] pointer-events-none">
    <!-- Radial mesh / grid overlay -->
    <div class="absolute inset-0 bg-[radial-gradient(#1b7f5a_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.08] mix-blend-overlay"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#040a08_80%)] opacity-80"></div>
    
    <!-- Shifting animated glowing blobs -->
    <div class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#1b7f5a]/20 filter blur-[80px] md:blur-[120px] animate-blob"></div>
    <div class="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-teal-800/15 filter blur-[80px] md:blur-[120px] animate-blob animation-delay-2000"></div>
    <div class="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 filter blur-[100px] md:blur-[150px] animate-blob animation-delay-4000"></div>
    
    <!-- Floating Starry Sparkles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-1.5 h-1.5 bg-amber-400 rounded-full blur-[1px] animate-float-sparkle" style="left: 5%; animation-delay: 0s; animation-duration: 20s;"></div>
      <div class="absolute w-2 h-2 bg-emerald-300 rounded-full blur-[1px] animate-float-sparkle" style="left: 25%; animation-delay: 5s; animation-duration: 27s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-white rounded-full animate-float-sparkle" style="left: 45%; animation-delay: 9s; animation-duration: 22s;"></div>
      <div class="absolute w-2 h-2 bg-yellow-200 rounded-full blur-[1px] animate-float-sparkle" style="left: 65%; animation-delay: 3s; animation-duration: 30s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full blur-[1.5px] animate-float-sparkle" style="left: 85%; animation-delay: 7s; animation-duration: 24s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-white rounded-full animate-float-sparkle" style="left: 15%; animation-delay: 13s; animation-duration: 21s;"></div>
      <div class="absolute w-2 h-2 bg-amber-300 rounded-full blur-[1px] animate-float-sparkle" style="left: 38%; animation-delay: 11s; animation-duration: 29s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-white rounded-full blur-[1px] animate-float-sparkle" style="left: 58%; animation-delay: 15s; animation-duration: 23s;"></div>
      <div class="absolute w-1.5 h-1.5 bg-emerald-300 rounded-full animate-float-sparkle" style="left: 75%; animation-delay: 17s; animation-duration: 26s;"></div>
    </div>
  </div>

  ${relativeNav}
  <main class="wrap">
  ${pageBody}
  </main>
  ${relativeFooter}
</body>
</html>`;
}

function buildAll() {
  const content = readContent();
  writePage('index.html', buildIndex(content));
  writePage('rooms.html', buildRooms(content));
  writePage('gallery.html', buildGallery(content));
  writePage('packages.html', buildPackages(content));
  writePage('contact.html', buildContact(content));
  writePage('promo.html', buildPromo(content));
  
  // Dynamic generation of independent room pages
  const roomsDir = path.join(root, 'rooms');
  if (!fs.existsSync(roomsDir)) {
    fs.mkdirSync(roomsDir, { recursive: true });
  }

  const generatedRoomPages = [];
  content.rooms.forEach(room => {
    const filename = path.join('rooms', `${room.id}.html`);
    const html = buildRoomDetailPage(content, room);
    writePage(filename, html);
    generatedRoomPages.push(filename);
  });

  // Dynamic generation of independent promo landing pages
  const promoDir = path.join(root, 'promo');
  if (!fs.existsSync(promoDir)) {
    fs.mkdirSync(promoDir, { recursive: true });
  }

  const generatedPromoPages = [];
  const promoPagesConfig = [
    { type: 'lebaran', slug: 'paket-lebaran-family-escape', file: 'promo/lebaran.html' },
    { type: 'honeymoon', slug: 'paket-honeymoon-romantic-stay', file: 'promo/honeymoon.html' },
    { type: 'bbq', slug: 'paket-weekend-bbq-glamping', file: 'promo/bbq.html' },
    { type: 'family', slug: 'paket-family-adventure-glamping', file: 'promo/family.html' }
  ];

  promoPagesConfig.forEach(cfg => {
    const pkg = content.packages.find(p => p.slug === cfg.slug);
    if (pkg) {
      const html = buildPromoLandingPage(content, pkg);
      writePage(cfg.file, html);
      generatedPromoPages.push(cfg.file);
    }
  });

  return { 
    ok: true, 
    pages: [
      'index.html', 
      'rooms.html', 
      'gallery.html', 
      'packages.html', 
      'contact.html',
      'promo.html',
      ...generatedRoomPages,
      ...generatedPromoPages
    ] 
  };
}

if (require.main === module) {
  const result = buildAll();
  console.log(`Built ${result.pages.length} Anaira frontend pages.`);
}

module.exports = { buildAll };
