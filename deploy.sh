#!/usr/bin/env bash
# One-click deploy script: build locally, upload, install on server, restart in daemon mode.
# Fill in SSH_PASS if you want password-based automation (requires sshpass installed locally).

set -euo pipefail

### === Config ===
SERVER_HOST="123.56.97.173"
SERVER_USER="root"
SERVER_PORT="22"
SSH_PASS="Xinghankeji123"          # <- fill password if not using SSH key; requires sshpass
REMOTE_DIR="/www/wwwroot/thermatechWebsite"
ARCHIVE="/tmp/thermatechWebsite.tgz"
PM2_NAME="thermatech-site"

### === Helpers ===
SSH="ssh -p ${SERVER_PORT}"
SCP="scp -P ${SERVER_PORT}"
if [[ -n "${SSH_PASS}" ]]; then
  SSH="sshpass -p ${SSH_PASS} ssh -p ${SERVER_PORT}"
  SCP="sshpass -p ${SSH_PASS} scp -P ${SERVER_PORT}"
fi

### === 1) Local build ===
echo "[local] Install client deps & build"
npm install --prefix client
npm run build --prefix client

### === 2) Package (skip node_modules/.git/.cache) ===
echo "[local] Create archive ${ARCHIVE}"
tar -czf "${ARCHIVE}" \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=.cache \
  -C "$(pwd)/.." "$(basename "$(pwd)")"

### === 3) Upload ===
echo "[local] Upload to ${SERVER_USER}@${SERVER_HOST}:${ARCHIVE}"
${SCP} "${ARCHIVE}" "${SERVER_USER}@${SERVER_HOST}:${ARCHIVE}"

### === 4) Remote install/build/restart ===
echo "[remote] Deploy and restart via pm2"
${SSH} "${SERVER_USER}@${SERVER_HOST}" bash <<'REMOTE_CMDS'
set -euo pipefail
ARCHIVE="/tmp/thermatechWebsite.tgz"
REMOTE_DIR="/www/wwwroot/thermatechWebsite"
PM2_NAME="thermatech-site"

mkdir -p "${REMOTE_DIR}"
tar -xzf "${ARCHIVE}" -C "${REMOTE_DIR}" --strip-components=1

cd "${REMOTE_DIR}/client"
npm install
npm run build

cd "${REMOTE_DIR}/server"
npm install

if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

pm2 delete "${PM2_NAME}" >/dev/null 2>&1 || true
NODE_ENV=production pm2 start index.js --name "${PM2_NAME}" --env production
pm2 save
REMOTE_CMDS

echo "[done] Deployed and restarted on ${SERVER_HOST}:3001"
