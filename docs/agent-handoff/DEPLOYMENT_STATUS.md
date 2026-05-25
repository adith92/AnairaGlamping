# 🚀 Deployment Status

Vercel project:
anairaglamp

Production URL:
https://anairaglamp.vercel.app

Deployment root:
frontend/hotelier

Critical fixed issue:
Previously Vercel root directory was "." and Vercel served QloApps PHP root, causing browser to download index.php.
Fix:
- Vercel project root changed to frontend/hotelier.
- Clean production deployment forced.
- Playwright browser tests confirmed render yes, download no.

Last confirmed deployment:
- commit: d34566e15d862e3dbe7cf75f3e9d8bdfcbcae367
- render status: yes
- download prompt: no
- content-type: text/html; charset=utf-8

Deploy command:
cd frontend/hotelier
vercel --prod --force --yes

Warning:
Never deploy from repo root.
