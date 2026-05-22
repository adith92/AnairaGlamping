$ErrorActionPreference = 'SilentlyContinue'

if (Get-Command node -ErrorAction SilentlyContinue) {
  node scripts/static-server.js
  exit $LASTEXITCODE
}

if (Get-Command python -ErrorAction SilentlyContinue) {
  python -m http.server 4173
  exit $LASTEXITCODE
}

if (Get-Command py -ErrorAction SilentlyContinue) {
  py -3 -m http.server 4173
  exit $LASTEXITCODE
}

if (Get-Command php -ErrorAction SilentlyContinue) {
  php -S localhost:4173
  exit $LASTEXITCODE
}

Write-Host 'No local runtime found. Install Node.js (recommended) then run: node scripts/static-server.js'
