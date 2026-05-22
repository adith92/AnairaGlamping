# Vercel Deploy Guide (Static Hotelier)

## Scope
Vercel hanya untuk frontend statis di rontend/hotelier.
Backend QloApps/PHP tetap deploy ke shared hosting.

## Local test
`ash
cd frontend/hotelier
node scripts/static-server.js
`
PowerShell shortcut:
`powershell
.\scripts\start-local.ps1
`

## Preview deploy
`ash
cd frontend/hotelier
npx.cmd vercel --yes
`

## Production deploy (manual approval)
`ash
cd frontend/hotelier
vercel --prod
`

## GitHub Integration Flow
1. Import repository dith92/AnairaGlamping ke Vercel.
2. Set **Root Directory**: rontend/hotelier.
3. Framework Preset: **Other**.
4. Build Command: kosongkan.
5. Output Directory: .
6. Install Command: 
pm install.
7. Preview deploy otomatis dari feature branch.
8. Production deploy dari branch produksi (develop/main) sesuai kebijakan tim.

## Pending
- Google Maps exact pin/share URL masih menunggu konfirmasi owner.

