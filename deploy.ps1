# One-click deploy script (PowerShell).
# 本机打包 -> 上传 -> 远端安装/构建 -> pm2 守护运行。
# 支持可选明文密码（需本机安装 sshpass）；否则默认使用 SSH 密钥或手动输入密码。

$ErrorActionPreference = 'Stop'

### === 配置区域 ===
# 默认用 SSH 配置里的别名“syseng”，可按需改回 IP/其他别名
$ServerHost = "syseng"
$ServerUser = "root"
$ServerPort = 22
$RemoteDir  = "/www/wwwroot/thermatechWebsite"
$Pm2Name    = "thermatech-site"
# 前端请求 API 的可解析地址/端口（使用 HTTPS）
$ApiHost    = "starthermatech.com"
$ApiPort    = "443"

# 如果要用密码自动化，在此填入；并确保本机已安装 sshpass（Win 可通过 choco 安装：choco install sshpass）
$SshPass    = ""   # 例如 "YourPassword"

### === 路径 ===
$RepoRoot = Resolve-Path (Get-Location)
$RepoName = Split-Path $RepoRoot -Leaf
$RepoParent = Split-Path $RepoRoot -Parent
$Archive  = Join-Path $env:TEMP "thermatechWebsite.tgz"
$RemoteArchive = "/tmp/thermatechWebsite.tgz"

Write-Host "[local] Repo: $RepoRoot"

### === 1) 本地构建 ===
Write-Host "[local] npm install & build (client)"
Push-Location (Join-Path $RepoRoot "client")
# 为前端构建提供可解析的 API 地址（HTTPS）
if ($ApiPort -eq "443") {
  $env:VITE_API_BASE = "https://$ApiHost"
} elseif ($ApiPort -and $ApiPort -ne "80") {
  $env:VITE_API_BASE = "http://$ApiHost`:$ApiPort"
} else {
  $env:VITE_API_BASE = "http://$ApiHost"
}
npm install
npm run build
Pop-Location

### === 2) 打包（排除 node_modules/.git/.cache） ===
Write-Host "[local] Create archive $Archive"
tar -czf "$Archive" `
  --exclude=node_modules `
  --exclude=.git `
  --exclude=.cache `
  -C "$RepoParent" "$RepoName"

### === 3) 上传 ===
Write-Host "[upload] -> ${ServerUser}@${ServerHost}:${RemoteArchive}"
if ($SshPass) {
  sshpass -p "$SshPass" scp -P $ServerPort "$Archive" "${ServerUser}@${ServerHost}:${RemoteArchive}"
} else {
  scp -P $ServerPort "$Archive" "${ServerUser}@${ServerHost}:${RemoteArchive}"
}

### === 4) 远端安装/构建/启动 ===
$remoteCmd = "set -e; " +
             "ARCHIVE=${RemoteArchive}; " +
             "REMOTE_DIR=${RemoteDir}; " +
             "PM2_NAME=${Pm2Name}; " +
             "mkdir -p '${RemoteDir}'; " +
             "tar -xzf '${RemoteArchive}' -C '${RemoteDir}' --strip-components=1; " +
             "cd '${RemoteDir}/client'; npm install; npm run build; " +
             "cd '${RemoteDir}/server'; npm install; " +
             "if ! command -v pm2 >/dev/null 2>&1; then npm install -g pm2; fi; " +
             "if pm2 describe '${Pm2Name}' >/dev/null 2>&1; then " +
             "  pm2 restart '${Pm2Name}'; " +
             "else " +
             "  NODE_ENV=production pm2 start index.js --name '${Pm2Name}' --env production; " +
             "fi; " +
             "pm2 save;"

Write-Host "[remote] Deploy & restart with pm2"
if ($SshPass) {
  sshpass -p "$SshPass" ssh -p $ServerPort "$ServerUser@$ServerHost" "$remoteCmd"
} else {
  ssh -p $ServerPort "$ServerUser@$ServerHost" "$remoteCmd"
}

Write-Host "[done] Deployed to $ServerHost:3001"
