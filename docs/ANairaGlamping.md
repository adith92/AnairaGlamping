# Anaira Glamping Technical Architecture

## Frontend Static (Hotelier)

- Path: `frontend/hotelier`
- Pages: `index.html`, `rooms.html`, `gallery.html`, `packages.html`, `contact.html`
- Content source: `frontend/hotelier/data/site-content.json`
- Rebuild script: `frontend/hotelier/scripts/build-pages.js`
- Local preview server: `frontend/hotelier/scripts/static-server.js`
- Local admin server: `frontend/hotelier/scripts/admin-server.js`

## Final Asset Structure

- Brand assets: `assets/brand/*`
- Hero images: `assets/images/hero/*`
- Room images: `assets/images/rooms/*`
- Facility images: `assets/images/facilities/*`
- Gallery images: `assets/images/gallery/*`
- Local uploads: `assets/images/uploads/*`
- Video: `assets/video/anaira-glamping-video.mp4`

## Anaira Admin Lite

Anaira Admin Lite is a local-only content editor. It is not a secure public admin and must not be exposed as a production dashboard.

Run:

```bash
cd frontend/hotelier
node scripts/admin-server.js
```

Open:

```text
http://localhost:4173/admin/
```

It can edit brand content, contact details, rooms/listings, packages, facilities, gallery paths, and local image uploads. It saves to `data/site-content.json` and rebuilds the static HTML pages.

## QloApps Admin

QloApps Back Office remains the operational backend admin after PHP backend deployment to shared hosting or VPS. It controls bookings, orders, guests, inventory, modules, and payment configuration.

## Local Preview

```bash
cd frontend/hotelier
node scripts/static-server.js
```

PowerShell:

```powershell
.\scripts\start-local.ps1
```

## Vercel Preview

```bash
cd frontend/hotelier
npx.cmd vercel --yes
```

## Payment Backend

Payment configuration belongs in QloApps Back Office, not Vercel. See `docs/PAYMENT_GATEWAY_SETUP.md`.

## Current Known Gaps

- PHP lint is pending unless PHP is installed locally.
- Payment sandbox credentials are still required.
- Shared hosting or VPS backend setup is still required for real QloApps admin/payment testing.
