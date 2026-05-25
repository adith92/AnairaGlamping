# 🍏 Mac Start Here

Welcome to the Anaira Glamping project on Mac!

1. Context:
You (AntiGravity) are continuing this project from where the Windows agent left off.
Do not read old local Antigravity logs because they don't exist on this Mac.
Read the docs in this folder for the source of truth.

2. Initial checklist:
- Read PROJECT_STATUS.md
- Read DEPLOYMENT_STATUS.md
- Read NEXT_STEPS.md
- Read DECISIONS.md

3. Setup local environment (if needed):
- Ensure Node.js is installed.
- Ensure Vercel CLI is installed (`npm i -g vercel`).
- Local frontend server: `cd frontend/hotelier` then `node scripts/static-server.js` (starts on port 3000).

4. Deployment rules:
- Always deploy from frontend/hotelier: `cd frontend/hotelier` -> `vercel --prod --force --yes`
- Never deploy the repo root.

5. Project rules:
- Keep the current UI/UX design.
- The project is on `develop` branch.
- Wait for user instructions before building new features.
