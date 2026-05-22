# Vercel Deploy Guide (Static Hotelier)

## Scope

Vercel only serves the static frontend in `frontend/hotelier`.

The QloApps PHP backend, Back Office, and payment modules should run on shared hosting or a VPS.

## Local Preview

```bash
cd frontend/hotelier
node scripts/static-server.js
```

PowerShell shortcut:

```powershell
.\scripts\start-local.ps1
```

## Local Content Admin

```bash
cd frontend/hotelier
node scripts/admin-server.js
```

Open:

```text
http://localhost:4173/admin/
```

Use Admin Lite locally, rebuild pages, commit the changed JSON/assets/HTML, then push to GitHub for Vercel preview.

## Preview Deploy

```bash
cd frontend/hotelier
npx.cmd vercel --yes
```

## Production Deploy

Production deploy requires explicit approval:

```bash
cd frontend/hotelier
vercel --prod
```

## GitHub Integration Flow

1. Import repository `adith92/AnairaGlamping` to Vercel.
2. Set Root Directory to `frontend/hotelier`.
3. Framework Preset: `Other`.
4. Build Command: empty.
5. Output Directory: `.`.
6. Install Command: `npm install`.
7. Preview deploys from feature branches.
8. Production deploys from the chosen production branch.

## Notes

- Vercel does not persist Admin Lite uploads unless they are committed to Git.
- Payment gateways are configured in QloApps Back Office, not Vercel.
- Google Maps final link: `https://maps.app.goo.gl/YVSmNtEsiK9tQNRS6`.
