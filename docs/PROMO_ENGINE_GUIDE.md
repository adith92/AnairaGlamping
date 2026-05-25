# 🏷️ Anaira Promo Staycation & SEO Guide
## Landing Catalog, Vercel Rewrites & Sitemap Index

The Promo Engine is built for high search engine visibility (SEO-friendly) and conversion tracking.

---

## 🏕️ 1. Active Stays Packages Catalog
All packages have detailed landing pages generated under `promo/` folder:
1. **Lebaran Family Escape:** `promo/lebaran.html` (Voucher: `LEBARAN10`) - nett rate Rp 3.500.000 (nett/paket)
2. **Romantic Honeymoon:** `promo/honeymoon.html` (Voucher: `HONEYMOON15`) - nett rate Rp 2.500.000
3. **Weekend BBQ Glamping:** `promo/bbq.html` (Voucher: `WEEKEND10`) - nett rate Rp 1.800.000
4. **Family Adventure Glamping:** `promo/family.html` (Voucher: `FAMILYGETAWAY`) - nett rate Rp 2.200.000

---

## 🔗 2. URL Parameter Autocomplete
Landing CTA buttons link directly to `/booking.html?package=SLUG&voucher=CODE`.
- On loading `booking.html`, the reservation wizard:
  1. Detects `package` query parameter.
  2. Resolves stay dates and length (e.g. 1 night for BBQ, 2 nights for Honeymoon).
  3. Renders a beautiful right sidebar package overview detailing all inclusions.
  4. Automatically fills and applies the specified voucher, updating subtotals and booking records automatically.

---

## 🌐 3. Vercel Clean URL Rewrites
Clean URLs are mapped in `vercel.json` as follows:
```json
{ "source": "/promo", "destination": "/promo.html" },
{ "source": "/promo/lebaran", "destination": "/promo/lebaran.html" },
{ "source": "/promo/honeymoon", "destination": "/promo/honeymoon.html" },
{ "source": "/promo/bbq", "destination": "/promo/bbq.html" },
{ "source": "/promo/family", "destination": "/promo/family.html" }
```
This serves compiled pages at `/promo/lebaran` dynamically without the `.html` extension, preserving beautiful clean URLs. All paths are indexed inside `sitemap.xml` with standard priority.
