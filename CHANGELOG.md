# 🧾 CHANGELOG

## [Final Feature Wave] - 2026-05-26

### Added
- **Packages staycation / Paket Promo**: Dynamic stay packages system fully implemented and linked seamlessly to booking online with auto-appended voucher parameters.
- **PMS Packages Editor**: Complete CRUD interface integrated in the admin panel (`pms.html`) with advanced fields support, custom type mapping, and automated static page rebuilder triggers.
- **Featured Deals**: Specialized discount offers section displayed on the homepage with high-attention badges and auto-filled voucher links.
- **Voucher PMS System**: Dynamic voucher code generator interface added to `pms.html` with promo source categorization (IG, Threads, Influencer, Partner, Manual, Website) and dynamic Influencer Name inputs.
- **Voucher Booking/Payment Integration**: Asynchronous voucher code validation and automatic stay discount calculation integrated in `booking.html` via the shared `AnairaDB.validateVoucher()` engine, protecting total payments from double claims or expired vouchers.
- **Contact Map Auto-Load**: Lazy-loaded, zero-click interactive Google Map embed correctly displayed in `contact.html` with a direct maps fallback launcher.
- **Gallery Slideshow Lightbox**: Stunning fullscreen lightbox built in `gallery.html` with fade + scale animations, backdrop blur, keyboard arrow keys navigation, esc-key termination, image loading states, and automatic slideshow controls (Play/Pause).

### Changed
- **WhatsApp Buttons Cleanup**: WhatsApp Visual spam restricted exclusively to the Contacts page and dynamic post-booking invoice. All sidepages WA calls redirected elegantly to `contact.html`.
- **Booking Flow Query Params**: Updated checkout flow to detect `?voucher=CODE` and `?package=SLUG` query parameters on load to auto-apply package stay values and apply voucher savings automatically.
- **Professional Website Polish**: Consistently aligned typography (Google Font Plus Jakarta Sans), glassmorphism panel enhancements, dynamic empty state tables, skeleton loader animations, and trust badges added to homepage.
- **README Documentation**: Comprehensive operational handbook updated with Dual-mode database setup, Live Mode environment overrides, sitemap index, and PMS CRUD instructions.
- **Build Pages Compilation**: Updated static generator compiler (`build-pages.js`) to support dynamic package catalogs and render all 8 premium static pages correctly.

### Fixed
- **Contact Map Loading**: Contact map no longer requires click to load and displays fully upon entry.
- **Gallery Modal Close & Navigation**: Gallery modal has a clear, always-visible Close (✕) button and keyboard navigation trap.
- **JSON Configuration Parsing**: Resolved double brackets and quote issues in `site-content.json` configuration blocks.

### Removed
- Removed temporary backup files:
  - `pms.html.bak-202605260200`
  - `booking.html.bak-202605260200`
  - `site-content.json.bak-202605260200`
  - `anaira-data-lib.js.bak-202605260200`
  - `build-pages.js.bak-202605260200`

### Validation
- `node --check` syntax check results: Passed flawlessly.
- `build-pages` static compilation result: 100% Successful (Built 8 pages).
- Local server route verification: Fully functional.
