/**
 * ============================================================================
 * Anaira AI/FAQ Concierge Chatbot Widget
 * ============================================================================
 * 
 * An offline-first, rule-based premium floating chatbot widget.
 * Loads localized FAQ questions from data/faq.json and provides instant replies
 * with zero server costs, zero API latency, and complete mobile responsiveness.
 * 
 * Features premium forest green glassmorphic styling matching Anaira Glamping.
 * ============================================================================
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. AI CONCIERGE STUB HOOK (Disabled by default)
// ─────────────────────────────────────────────────────────────────────────────
// FAQ queries run entirely local & free. AI Concierge is optional and disabled
// by default to prevent unexpected API consumption/costs. Configure here:
const anaira_ai_settings = {
  enabled: false,
  provider: "none", // e.g. "openai", "anthropic" or "custom"
  endpoint: "",
  model: "",
  maxMessagesPerSession: 5,
  fallbackToFAQ: true // Use local keyword rule-engine if AI fails or returns empty
};

(function () {
  // Prevent duplicate initialization
  if (window.AnairaChatbotInitialized) return;
  window.AnairaChatbotInitialized = true;

  // Local state
  let faqDatabase = [];
  const sessionMessages = [];

  // Determine correct relative path to data/faq.json depending on URL path
  function getFaqUrl() {
    const isRoomSubPage = window.location.pathname.includes('/rooms/') || 
                         window.location.pathname.split('/').pop().startsWith('balcony.html') ||
                         window.location.pathname.split('/').pop().startsWith('porch.html') ||
                         window.location.pathname.split('/').pop().startsWith('villa.html');
    return isRoomSubPage ? '../data/faq.json' : 'data/faq.json';
  }

  // Load FAQ Database
  async function loadFAQ() {
    const faqUrl = getFaqUrl();
    try {
      const response = await fetch(faqUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      faqDatabase = await response.json();
    } catch (e) {
      console.warn("[Anaira Chatbot] Failed to load local faq.json directly. Seeding fallback cache.", e);
      // Inline robust fallback to ensure it works even if offline filesystem paths have restrictions
      faqDatabase = [
        {
          "id": "room-balcony",
          "category": "rooms",
          "question": "Detail tipe kamar Balcony Suite?",
          "answer": "Tipe Balcony Suite adalah unit glamping premium dengan balkon pribadi dan pemandangan kebun asri Anaira. Maksimal 4 orang. Fasilitas: AC, Android TV, kamar mandi dalam, air panas (water heater), wifi, amenities lengkap.",
          "keywords": ["balcony", "balkon", "suite", "fasilitas balcony", "kapasitas balcony"]
        },
        {
          "id": "room-porch",
          "category": "rooms",
          "question": "Detail tipe kamar Porch Cabin?",
          "answer": "Tipe Porch Cabin adalah cabin glamping nyaman dengan teras outdoor (porch) pribadi yang luas. Maksimal 4 orang. Fasilitas: Kipas Angin, Android TV, kamar mandi dalam, water heater, wifi, amenities.",
          "keywords": ["porch", "cabin", "teras", "fasilitas porch", "kapasitas porch"]
        },
        {
          "id": "room-villa",
          "category": "rooms",
          "question": "Detail tipe Presidential Villa?",
          "answer": "Presidential Villa adalah villa megah berkapasitas 20 orang. Fasilitas: AC, Android TV, dapur lengkap (kitchen set, kulkas, kompor, dispenser), set karaoke eksklusif, ruang kumpul luas, dekat kolam renang alami.",
          "keywords": ["villa", "presidential", "keluarga besar", "fasilitas villa", "karaoke", "dapur"]
        },
        {
          "id": "price-rates",
          "category": "prices",
          "question": "Berapa tarif sewa kamar per malam?",
          "answer": "Tarif sewa per malam (Nett):\n1. **Porch Cabin:** Weekday Rp 350.000 / malam, Weekend Rp 420.000 / malam.\n2. **Balcony Suite:** Weekday Rp 500.000 / malam, Weekend Rp 700.000 / malam.\n3. **Presidential Villa:** Weekday Rp 2.100.000 / malam, Weekend Rp 3.000.000 / malam.\n*Weekday: Senin-Kamis. Weekend: Jumat-Minggu.*",
          "keywords": ["harga", "tarif", "sewa", "biaya", "rate", "permalam", "weekday", "weekend", "murah"]
        },
        {
          "id": "price-extra-bed",
          "category": "prices",
          "question": "Apakah bisa menambah Extra Bed?",
          "answer": "Ya, biaya Extra Bed adalah Rp 150.000 per bed per malam (sudah termasuk tambahan 1 pax sarapan pagi). Request saat booking online atau infokan sebelum kedatangan.",
          "keywords": ["extra bed", "kasur tambahan", "tambah kasur", "biaya extra", "kasur", "extrabed"]
        },
        {
          "id": "package-lebaran",
          "category": "packages",
          "question": "Apa itu Paket Lebaran Family Escape?",
          "answer": "Paket Lebaran Family Escape seharga Rp 3.500.000 (normal Rp 4.500.000): Menginap 2 malam di Canopy Luxury Glamping / Villa, Sarapan untuk 4 pax, BBQ Dinner Set spesial, pool & bonfire access, hampers Lebaran eksklusif. Kode voucher: **LEBARAN10**.",
          "keywords": ["lebaran", "paket lebaran", "family escape", "idul fitri", "juni", "promo lebaran"]
        },
        {
          "id": "package-honeymoon",
          "category": "packages",
          "question": "Apa itu Paket Honeymoon Romantic Stay?",
          "answer": "Paket Honeymoon Romantic Stay seharga Rp 2.500.000 (normal Rp 3.200.000): Menginap 2 malam di Balcony Glass Suite Premium, floating breakfast, 1x Romantic Candlelight Dinner, dekorasi romantis kelopak bunga di kasur & bathtub, cokelat & welcome drink. Kode voucher: **HONEYMOON15**.",
          "keywords": ["honeymoon", "bulan madu", "paket romantis", "candlelight", "romantic", "pasangan"]
        },
        {
          "id": "location-direction",
          "category": "location",
          "question": "Di mana lokasi Anaira Glamping & Resort?",
          "answer": "Anaira Glamping & Resort berlokasi di **Jl. Raya Curug Nangka, Ciapus, Bogor, Jawa Barat** dekat kaki Gunung Salak. Udara sejuk dan alami.",
          "keywords": ["lokasi", "alamat", "rute", "jalan", "arah", "ciapus", "bogor", "gunung salak", "curug nangka"]
        },
        {
          "id": "location-maps",
          "category": "location",
          "question": "Bagaimana Google Maps resmi Anaira?",
          "answer": "Tautan resmi Google Maps Anaira Glamping & Resort adalah: [https://maps.app.goo.gl/YVSmNtEsiK9tQNRS6](https://maps.app.goo.gl/YVSmNtEsiK9tQNRS6). Buka di ponsel Anda untuk navigasi mudah.",
          "keywords": ["maps", "google maps", "peta", "link maps", "gps", "gmap"]
        },
        {
          "id": "policy-checkin-checkout",
          "category": "resort policies",
          "question": "Jam berapa waktu Check-in dan Check-out?",
          "answer": "Waktu Check-in standar adalah mulai pukul **13.00 WIB**, sedangkan waktu Check-out standar adalah maksimal pukul **12.00 WIB**.",
          "keywords": ["checkin", "checkout", "jam masuk", "jam keluar", "jam check-in", "jam check-out"]
        },
        {
          "id": "policy-cancellation",
          "category": "resort policies",
          "question": "Bagaimana kebijakan pembatalan?",
          "answer": "Kebijakan resmi: **Cancel DP Hangus** (non-refundable). Namun, Anda **Bisa Reschedule** (penjadwalan ulang) maksimal H-7 sebelum tanggal check-in semula.",
          "keywords": ["batal", "cancellation", "cancel", "refund", "dp hangus", "reschedule", "ganti tanggal"]
        },
        {
          "id": "payment-methods",
          "category": "payments",
          "question": "Metode pembayaran apa saja yang diterima?",
          "answer": "Kami menerima:\n1. **INDOPAY QRIS:** Scan kode QR otomatis via m-Banking atau e-wallet (GoPay, OVO, ShopeePay, DANA).\n2. **Virtual Account (VA) BCA / Transfer BCA**\n3. **Midtrans / Xendit:** Kartu Kredit & Retail Outlet (Alfamart/Indomaret).",
          "keywords": ["bayar", "pembayaran", "metode", "transfer", "rekening", "bca", "qris", "gopay", "ovo", "dana"]
        }
      ];
    }
  }

  // Inject Styles dynamically
  function injectStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Chat bubble trigger button */
      .anaira-chat-bubble {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(10, 46, 32, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(27, 127, 90, 0.45);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 99998;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: #f6f1e7;
      }
      .anaira-chat-bubble:hover {
        transform: scale(1.08) translateY(-3px);
        border-color: rgba(27, 127, 90, 0.8);
        box-shadow: 0 12px 30px rgba(27, 127, 90, 0.35);
        background: rgba(27, 127, 90, 0.85);
      }
      .anaira-chat-bubble svg {
        width: 28px;
        height: 28px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.2;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: transform 0.3s ease;
      }
      .anaira-chat-bubble.open svg {
        transform: rotate(90deg);
      }

      /* Glowing pulse indicator for chatbot */
      .anaira-chat-pulse {
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #22c55e;
        border: 2px solid #06140e;
        box-shadow: 0 0 6px #22c55e;
        animation: pulse-ring 2s infinite;
      }
      @keyframes pulse-ring {
        0% { transform: scale(0.95); opacity: 1; }
        50% { transform: scale(1.15); opacity: 0.8; }
        100% { transform: scale(0.95); opacity: 1; }
      }

      /* Conversational panel card */
      .anaira-chat-panel {
        position: fixed;
        bottom: 96px;
        right: 24px;
        width: 380px;
        max-width: calc(100vw - 48px);
        height: 550px;
        max-height: calc(100vh - 140px);
        background: rgba(8, 22, 16, 0.88);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(27, 127, 90, 0.35);
        border-radius: 24px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        z-index: 99999;
        overflow: hidden;
        opacity: 0;
        transform: translateY(20px) scale(0.95);
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        font-family: 'Plus Jakarta Sans', Segoe UI, sans-serif;
      }
      .anaira-chat-panel.active {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }

      /* Header styling */
      .anaira-chat-header {
        padding: 16px 20px;
        background: rgba(10, 46, 32, 0.5);
        border-bottom: 1px solid rgba(27, 127, 90, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .anaira-chat-header-profile {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .anaira-chat-avatar {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        border: 1px solid rgba(27, 127, 90, 0.4);
        background: #06140e;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
      .anaira-chat-title-container {
        display: flex;
        flex-direction: column;
      }
      .anaira-chat-title {
        font-weight: 700;
        font-size: 0.95rem;
        color: #f6f1e7;
        margin: 0;
      }
      .anaira-chat-subtitle {
        font-size: 0.72rem;
        color: #a7eed0;
        opacity: 0.85;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .anaira-chat-subtitle::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #22c55e;
      }
      .anaira-chat-close-btn {
        background: none;
        border: none;
        color: #a7eed0;
        cursor: pointer;
        opacity: 0.7;
        font-size: 1.15rem;
        padding: 4px;
        transition: opacity 0.2s, transform 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .anaira-chat-close-btn:hover {
        opacity: 1;
        transform: scale(1.1);
      }

      /* Messages area */
      .anaira-chat-body {
        flex-grow: 1;
        padding: 20px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 14px;
        scroll-behavior: smooth;
      }
      .anaira-chat-body::-webkit-scrollbar {
        width: 5px;
      }
      .anaira-chat-body::-webkit-scrollbar-track {
        background: transparent;
      }
      .anaira-chat-body::-webkit-scrollbar-thumb {
        background: rgba(27, 127, 90, 0.4);
        border-radius: 10px;
      }

      /* Message bubbles */
      .anaira-chat-msg-row {
        display: flex;
        width: 100%;
      }
      .anaira-chat-msg-row.user {
        justify-content: flex-end;
      }
      .anaira-chat-bubble-text {
        max-width: 80%;
        padding: 12px 16px;
        font-size: 0.85rem;
        line-height: 1.45;
        word-wrap: break-word;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      }
      .anaira-chat-msg-row.bot .anaira-chat-bubble-text {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(27, 127, 90, 0.2);
        color: #f6f1e7;
        border-radius: 18px 18px 18px 4px;
      }
      .anaira-chat-msg-row.user .anaira-chat-bubble-text {
        background: #1b7f5a;
        color: #ffffff;
        border-radius: 18px 18px 4px 18px;
        border: 1px solid rgba(27, 127, 90, 0.1);
      }

      /* Format styling within bot answers */
      .anaira-chat-bubble-text p {
        margin: 0 0 8px 0;
      }
      .anaira-chat-bubble-text p:last-child {
        margin-bottom: 0;
      }
      .anaira-chat-bubble-text a {
        color: #a7eed0;
        text-decoration: underline;
        font-weight: 600;
        transition: color 0.2s;
      }
      .anaira-chat-bubble-text a:hover {
        color: #ffffff;
      }
      .anaira-chat-bubble-text strong {
        color: #a7eed0;
        font-weight: 700;
      }
      .anaira-chat-bubble-text ul {
        margin: 6px 0;
        padding-left: 18px;
      }
      .anaira-chat-bubble-text li {
        margin-bottom: 4px;
      }

      /* Quick Actions Chips Container */
      .anaira-chat-chips-area {
        padding: 0 16px 12px 16px;
        background: transparent;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        border-top: 1px solid transparent;
      }
      .anaira-chat-chip {
        background: rgba(27, 127, 90, 0.15);
        border: 1px solid rgba(27, 127, 90, 0.35);
        color: #a7eed0;
        font-size: 0.72rem;
        font-weight: 600;
        padding: 6px 12px;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 4px;
        user-select: none;
      }
      .anaira-chat-chip:hover {
        background: rgba(27, 127, 90, 0.35);
        border-color: rgba(27, 127, 90, 0.6);
        color: #ffffff;
        transform: translateY(-1px);
      }
      .anaira-chat-chip:active {
        transform: translateY(0);
      }

      /* Footer Form Input */
      .anaira-chat-footer {
        padding: 12px 16px 16px 16px;
        background: rgba(10, 46, 32, 0.4);
        border-top: 1px solid rgba(27, 127, 90, 0.25);
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .anaira-chat-input-wrapper {
        flex-grow: 1;
        position: relative;
      }
      .anaira-chat-input {
        width: 100%;
        background: rgba(6, 20, 14, 0.85);
        border: 1px solid rgba(27, 127, 90, 0.4);
        color: #f6f1e7;
        font-size: 0.82rem;
        padding: 10px 14px;
        border-radius: 14px;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .anaira-chat-input:focus {
        border-color: rgba(27, 127, 90, 0.8);
        box-shadow: 0 0 10px rgba(27, 127, 90, 0.25);
      }
      .anaira-chat-send-btn {
        background: #1b7f5a;
        color: #ffffff;
        border: none;
        border-radius: 12px;
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 4px 10px rgba(27, 127, 90, 0.2);
        flex-shrink: 0;
      }
      .anaira-chat-send-btn:hover {
        background: #146546;
        transform: scale(1.05);
      }
      .anaira-chat-send-btn:active {
        transform: scale(0.95);
      }
      .anaira-chat-send-btn svg {
        width: 18px;
        height: 18px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2.2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      /* Mobile responsiveness adjustments */
      @media (max-width: 480px) {
        .anaira-chat-panel {
          bottom: 84px;
          right: 12px;
          width: calc(100vw - 24px);
          max-width: none;
          height: calc(100vh - 110px);
          max-height: none;
        }
        .anaira-chat-bubble {
          bottom: 16px;
          right: 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Simple parser to convert basic markup like bolding, lists, and links into HTML elements
  function parseTextToHtml(text) {
    let html = text;
    // Replace carriage returns/newlines with paragraphs or breaks
    html = html.replace(/\n/g, '<br>');

    // Replace [label](url) with <a href="url" target="_blank">label</a>
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Replace **text** with <strong>text</strong>
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Replace lists matching - items
    html = html.replace(/(?:<br>\s*-\s*([^<]+))+/g, function (match) {
      const items = match.split(/<br>\s*-\s*/).slice(1);
      return '<ul>' + items.map(item => `<li>${item}</li>`).join('') + '</ul>';
    });

    // Replace numbered list matching 1. 2.
    html = html.replace(/(?:<br>\s*\d+\.\s*([^<]+))+/g, function (match) {
      const items = match.split(/<br>\s*\d+\.\s*/).slice(1);
      return '<ol>' + items.map(item => `<li>${item}</li>`).join('') + '</ol>';
    });

    return html;
  }

  // Append new message to chat window
  function appendMessage(sender, text) {
    const chatBody = document.querySelector('.anaira-chat-body');
    if (!chatBody) return;

    const row = document.createElement('div');
    row.className = `anaira-chat-msg-row ${sender}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'anaira-chat-bubble-text';
    bubble.innerHTML = sender === 'bot' ? parseTextToHtml(text) : `<p>${text}</p>`;
    
    row.appendChild(bubble);
    chatBody.appendChild(row);

    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    // Track state
    sessionMessages.push({ sender, text });
  }

  // Local Rule-Based Keyword Match Engine
  function getFAQResponse(userQuery) {
    const normalizedQuery = userQuery.toLowerCase().trim();
    
    if (normalizedQuery === "") {
      return "Silakan tanyakan sesuatu pada Anaira Concierge! 😊";
    }

    // Direct Exact Trigger Mapping for Quick action matches
    if (normalizedQuery === "cek harga") {
      return faqDatabase.find(f => f.id === "price-rates")?.answer || "";
    }
    if (normalizedQuery === "cek promo") {
      return "Kami memiliki 3 Paket Promo Staycation unggulan yang bisa Anda nikmati saat ini:\n\n" +
             "1. **Paket Lebaran Family Escape:** staycation lengkap spesial reuni keluarga diskon 22%. Kode: **LEBARAN10**.\n" +
             "2. **Paket Honeymoon Romantic Stay:** liburan romantis pasangan baru diskon 21%. Kode: **HONEYMOON15**.\n" +
             "3. **Paket Weekend BBQ Glamping:** pesta BBQ seru di camping pribadi diskon 18%. Kode: **WEEKEND10**.\n\n" +
             "Untuk info detail rincian per paket, ketik nama paketnya (misal: 'lebaran', 'bbq', atau 'honeymoon')!";
    }
    if (normalizedQuery === "lihat kamar") {
      return "Anaira Glamping & Resort menyediakan 3 akomodasi mewah:\n\n" +
             "- **Porch Cabin** (weekday Rp 350rb, weekend Rp 420rb): cabin glamping sejuk dengan teras outdoor lapang.\n" +
             "- **Balcony Suite** (weekday Rp 500rb, weekend Rp 700rb): unit premium dengan balkon menatap alam kebun luas.\n" +
             "- **Presidential Villa** (weekday Rp 2,1jt, weekend Rp 3jt): villa megah 20 orang lengkap dengan karaoke & kitchen set.\n\n" +
             "Ketik salah satu tipe kamar untuk detail foto & fasilitas!";
    }
    if (normalizedQuery === "lokasi maps") {
      return faqDatabase.find(f => f.id === "location-maps")?.answer || "";
    }

    // Match keywords using scores
    let bestMatch = null;
    let highestScore = 0;

    faqDatabase.forEach(item => {
      let score = 0;
      item.keywords.forEach(keyword => {
        if (normalizedQuery.includes(keyword)) {
          score += keyword.length; // score proportional to keyword length for better matching accuracy
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    if (bestMatch && highestScore > 0) {
      return bestMatch.answer;
    }

    // Generic Smart Rule Fallback
    return "Maaf, Anaira Concierge belum mengerti pertanyaan Anda secara spesifik. 🏕️\n\n" +
           "Silakan gunakan kata kunci yang lebih jelas seperti: **'harga'**, **'villa'**, **'lebaran'**, **'jam check-in'**, **'alamat'**, **'bbq'**, atau **'batal'**.\n\n" +
           "Anda juga dapat mengklik tombol Aksi Cepat di bawah ini untuk respon kilat instan!";
  }

  // Handle Send logic
  async function handleSend() {
    const input = document.querySelector('.anaira-chat-input');
    if (!input) return;

    const userText = input.value.trim();
    if (!userText) return;

    // 1. Render User Message
    appendMessage('user', userText);
    input.value = "";

    // 2. Typing indicator delay simulated
    const chatBody = document.querySelector('.anaira-chat-body');
    const typingRow = document.createElement('div');
    typingRow.className = 'anaira-chat-msg-row bot typing-indicator';
    typingRow.innerHTML = `<div class="anaira-chat-bubble-text" style="padding: 10px 15px; opacity:0.75;">Menulis jawaban... ✍️</div>`;
    chatBody.appendChild(typingRow);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(async () => {
      // Remove typing indicator
      const activeTyping = document.querySelector('.typing-indicator');
      if (activeTyping) activeTyping.remove();

      // 3. Process LLM/FAQ logic
      let botResponse = "";
      
      if (anaira_ai_settings.enabled && sessionMessages.filter(m => m.sender === 'user').length <= anaira_ai_settings.maxMessagesPerSession) {
        // Stub placeholder logic for future OpenAI/Claude dynamic AI API requests
        try {
          // If enabled, you can perform direct fetch calls to AI endpoint here!
          // botResponse = await callAIChatbotAPI(userText);
        } catch (e) {
          console.warn("[Anaira Chatbot] AI Concierge request failed. Falling back to local FAQ engine.");
          if (anaira_ai_settings.fallbackToFAQ) {
            botResponse = getFAQResponse(userText);
          }
        }
      } else {
        // Run entirely local, free offline search engine
        botResponse = getFAQResponse(userText);
      }

      // 4. Render Bot response
      appendMessage('bot', botResponse);
    }, 450 + Math.random() * 300); // realistic human writing delay
  }

  // Trigger quick action button send simulations
  function triggerQuickAction(actionName) {
    appendMessage('user', actionName);
    
    // Typing delay
    const chatBody = document.querySelector('.anaira-chat-body');
    const typingRow = document.createElement('div');
    typingRow.className = 'anaira-chat-msg-row bot typing-indicator';
    typingRow.innerHTML = `<div class="anaira-chat-bubble-text" style="padding: 10px 15px; opacity:0.75;">Memuat rincian... 🏕️</div>`;
    chatBody.appendChild(typingRow);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      const activeTyping = document.querySelector('.typing-indicator');
      if (activeTyping) activeTyping.remove();

      const botResponse = getFAQResponse(actionName);
      appendMessage('bot', botResponse);
    }, 400);
  }

  // Setup DOM elements injection on script evaluation
  function setupDOM() {
    // 1. Main Container
    const widget = document.createElement('div');
    widget.id = 'anaira-chatbot-widget';
    
    // 2. Chat Bubble Trigger
    const bubble = document.createElement('div');
    bubble.className = 'anaira-chat-bubble';
    bubble.innerHTML = `
      <div class="anaira-chat-pulse"></div>
      <svg viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
    
    // 3. Conversational Panel
    const panel = document.createElement('div');
    panel.className = 'anaira-chat-panel';
    panel.innerHTML = `
      <!-- Header -->
      <div class="anaira-chat-header">
        <div class="anaira-chat-header-profile">
          <div class="anaira-chat-avatar">🏕️</div>
          <div class="anaira-chat-title-container">
            <h3 class="anaira-chat-title">Anaira Concierge</h3>
            <p class="anaira-chat-subtitle">Layanan Instan / Offline</p>
          </div>
        </div>
        <button class="anaira-chat-close-btn" title="Tutup Chat">&times;</button>
      </div>

      <!-- Messages Area -->
      <div class="anaira-chat-body">
        <!-- Welcomes automatically rendered here -->
      </div>

      <!-- Quick Action Buttons -->
      <div class="anaira-chat-chips-area">
        <div class="anaira-chat-chip" data-action="Cek Harga">💰 Cek Harga</div>
        <div class="anaira-chat-chip" data-action="Cek Promo">🎁 Cek Promo</div>
        <div class="anaira-chat-chip" data-action="Lihat Kamar">🏕️ Lihat Kamar</div>
        <div class="anaira-chat-chip" data-action="Lokasi Maps">📍 Lokasi Maps</div>
        <a href="booking.html" class="anaira-chat-chip" style="text-decoration:none;">📅 Pesan Online</a>
        <a href="https://wa.me/6281399693499?text=Halo%20Anaira%20Glamping%2C%20saya%20ingin%20booking" target="_blank" class="anaira-chat-chip" style="text-decoration:none;">📞 WhatsApp</a>
      </div>

      <!-- Footer Input Form -->
      <div class="anaira-chat-footer">
        <div class="anaira-chat-input-wrapper">
          <input type="text" class="anaira-chat-input" placeholder="Ketik pertanyaan Anda...">
        </div>
        <button class="anaira-chat-send-btn" title="Kirim">
          <svg viewBox="0 0 24 24">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `;

    widget.appendChild(bubble);
    widget.appendChild(panel);
    document.body.appendChild(widget);

    // Event Listeners for Panel opening / toggling
    bubble.addEventListener('click', () => {
      const isOpen = panel.classList.contains('active');
      if (isOpen) {
        panel.classList.remove('active');
        bubble.classList.remove('open');
      } else {
        panel.classList.add('active');
        bubble.classList.add('open');
        // Hide the unread pulse indicator when opened
        const pulse = bubble.querySelector('.anaira-chat-pulse');
        if (pulse) pulse.style.display = 'none';

        // Trigger welcome greeting on first load
        const chatBody = panel.querySelector('.anaira-chat-body');
        if (chatBody && chatBody.children.length === 0) {
          appendMessage('bot', "Selamat datang di **Anaira Glamping & Resort**! 🏕️✨\n\nSaya adalah **Anaira AI/FAQ Concierge** yang siap membantu memberikan rincian harga sewa, info kamar premium, promo staycation terbaru, peta lokasi, hingga panduan resort secara instan.\n\nAda yang bisa saya bantu hari ini?");
        }
      }
    });

    // Close button click
    const closeBtn = panel.querySelector('.anaira-chat-close-btn');
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('active');
      bubble.classList.remove('open');
    });

    // Handle Quick Action Chip clicks
    const chips = panel.querySelectorAll('.anaira-chat-chip[data-action]');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const action = chip.getAttribute('data-action');
        triggerQuickAction(action);
      });
    });

    // Form input submission
    const sendBtn = panel.querySelector('.anaira-chat-send-btn');
    const chatInput = panel.querySelector('.anaira-chat-input');

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    });
  }

  // Initialize
  async function init() {
    injectStyles();
    await loadFAQ();
    setupDOM();
    console.log("[Anaira Chatbot] Widget successfully initialized.");
  }

  // Run on page load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
