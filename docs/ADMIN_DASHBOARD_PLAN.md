# Admin Dashboard Plan

## QloApps Admin

QloApps Admin is the operational backend admin. It will be available after the PHP backend is installed on shared hosting or a VPS.

It controls:

- bookings and orders
- guests and customers
- room inventory
- modules
- payment gateway configuration
- order/payment status

## Anaira Admin Lite

Anaira Admin Lite is a local-only content editor for the static Hotelier frontend.

Local URL:

```text
http://localhost:4173/admin/
```

It edits:

- brand text
- contact details
- WhatsApp number
- Google Maps link
- rooms/listings
- packages
- facilities
- gallery image paths
- local uploaded images under `assets/images/uploads/`

It writes content to:

```text
frontend/hotelier/data/site-content.json
```

It rebuilds:

```text
frontend/hotelier/index.html
frontend/hotelier/rooms.html
frontend/hotelier/gallery.html
frontend/hotelier/packages.html
frontend/hotelier/contact.html
```

## Deployment Flow

Anaira Admin Lite does not store content in Vercel. Vercel does not provide persistent uploaded image storage for this static site.

Use this flow:

```text
Run Admin Lite locally -> edit JSON/assets -> rebuild pages -> commit to GitHub -> Vercel redeploys static frontend
```

For a full production web admin later, use the QloApps backend on shared hosting/VPS or add a real storage/database service.
