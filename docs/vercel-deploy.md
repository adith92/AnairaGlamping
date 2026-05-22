# Vercel Deploy Guide (Static Hotelier)

## Scope
Vercel hanya untuk frontend statis di `frontend/hotelier`.
Backend QloApps/PHP tetap deploy ke shared hosting.

## Local test
```bash
cd frontend/hotelier
npm.cmd install
npm.cmd run dev
```

## Vercel preview CLI
```bash
cd frontend/hotelier
vercel
```

## Vercel production CLI
```bash
cd frontend/hotelier
vercel --prod
```

## GitHub Integration Flow
1. Import repository `adith92/AnairaGlamping` ke Vercel.
2. Set **Root Directory**: `frontend/hotelier`.
3. Framework Preset: **Other**.
4. Build Command: kosongkan.
5. Output Directory: `.`
6. Install Command: `npm install`.
7. Production branch: pilih `develop` atau `main` sesuai kebijakan.
8. Push branch feature (`feature/anaira-glamping`) akan membuat preview deployment otomatis.
9. Merge ke production branch akan trigger production deployment.

## Notes
- Codex tidak perlu koneksi langsung ke Vercel.
- Alur benar: Codex push ke GitHub -> Vercel Git Integration deploy.
