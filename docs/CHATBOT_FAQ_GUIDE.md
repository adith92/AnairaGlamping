# 💬 Anaira AI/FAQ Concierge Chatbot Guide
## Rule-Based Keywords Matching Engine & AI Hook

The Anaira Chatbot is a self-contained, high-performance, responsive assistant widget designed to convert landing page visitors into booked guests with **zero latency** and **zero API costs**.

---

## 🛠️ 1. Architecture
- **Script File:** `frontend/hotelier/scripts/anaira-chatbot.js`
- **FAQ File:** `frontend/hotelier/data/faq.json`
- **Styling:** Premium dark green glassmorphism layout, glowing unread bubble pulse, Lucide CDNs, and a responsive panel matching mobile layouts.

---

## 🔍 2. Rule Matching Logic
The widget matches user inputs against localized FAQ keywords inside `faq.json`:
- **Keywords mapped:**
  - `harga`, `tarif`, `sewa`, `biaya` -> Room/Stay rates
  - `balcony`, `porch`, `villa` -> Specific room capacities and details
  - `promo`, `voucher`, `diskon`, `lebaran`, `honeymoon`, `bbq`, `family` -> active promotional staycation packages
  - `lokasi`, `alamat`, `curug nangka`, `ciapus`, `bogor` -> Google Maps coordinates and direction directions
  - `jam check-in`, `checkout`, `keluar`, `masuk` -> Operational hours (13:00 - 12:00)
  - `bayar`, `qris`, `transfer`, `rekening`, `bca` -> BCA Virtual Account / QRIS guides
  - `batal`, `cancel`, `hangus`, `reschedule` -> Policies
- **Keyword Scoring Engine:** Matches multiple tokens in user typed text, calculates keyword matches, and retrieves the highest-scoring FAQ category instantly with fallback messages if no match is found.

---

## 🤖 3. Optional AI Concierge Hook
In `anaira-chatbot.js`, we define the config block:
```javascript
const anaira_ai_settings = {
  enabled: false,
  provider: "none", // e.g. "openai" or "gemini" or "claude"
  endpoint: "",
  model: "",
  maxMessagesPerSession: 5,
  fallbackToFAQ: true
};
```
- **Operational Rule:** The widget operates entirely on free local FAQs. If `enabled` is toggled to `true` later in the PMS settings, it can parse and invoke the serverless API endpoint, sending page context while keeping admin metrics, payments, and guest databases completely secure.
