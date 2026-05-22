# Anaira Glamping Technical Architecture

## Frontend Static (Hotelier)
- Path: rontend/hotelier
- Pages: index.html, ooms.html, gallery.html, packages.html, contact.html
- Navbar brand logo: ssets/brand/logo-anaira-black-transparent.png
- Footer logo: ssets/brand/logo-anaira-white-transparent.png
- Favicon and Apple touch icon active across all pages.
- OG image active across all pages.

## Final Asset Structure
- ssets/brand/*
- ssets/images/hero/*
- ssets/images/rooms/*
- ssets/images/facilities/*
- ssets/images/gallery/*
- ssets/video/anaira-glamping-video.mp4
- ssets/asset-manifest.json

## Image Mapping
- Hero desktop/mobile via <picture> on home.
- Rooms page uses Balcony/Porch/Villa final webp assets.
- Facilities section uses pool/garden/outdoor seating photos.
- Gallery uses gallery-* full image and 	humb-* thumbnails with loading="lazy".

## Local Preview
`ash
cd frontend/hotelier
node scripts/static-server.js
`
PowerShell:
`powershell
.\scripts\start-local.ps1
`

## Vercel Preview
`ash
cd frontend/hotelier
npx.cmd vercel --yes
`

## Pending
- Google Maps final link: https://maps.app.goo.gl/YVSmNtEsiK9tQNRS6.
- PHP lint backend tetap pending jika runtime PHP belum tersedia di mesin.

