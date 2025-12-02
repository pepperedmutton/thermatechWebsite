# 下载服务器 PM2 日志（打包后保存到本地 pm2-logs 目录）
# 需本机安装 ssh/scp；密码登录时运行后输入密码，或配置 SSH 密钥免密。

$ErrorActionPreference = 'Stop'

$Server = "123.56.97.173"
$User   = "root"
$Port   = 22
$RemotePm2Dir = "/root/.pm2/logs"
$Desktop = [Environment]::GetFolderPath("Desktop")
$LocalDir = Join-Path $Desktop "pm2-logs"

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$RemoteArchive = "/tmp/pm2-logs-$timestamp.tgz"
$LocalArchive  = Join-Path $LocalDir ("pm2-logs-$timestamp.tgz")

# 检查依赖
$sshCmd = Get-Command ssh -ErrorAction SilentlyContinue
$scpCmd = Get-Command scp -ErrorAction SilentlyContinue
if (-not $sshCmd -or -not $scpCmd) {
    Write-Error "未找到 ssh/scp，请先安装 OpenSSH 客户端（如 Git for Windows 自带）。"
    exit 1
}

# 确保本地目录存在
if (-not (Test-Path -LiteralPath $LocalDir)) {
    New-Item -ItemType Directory -Path $LocalDir | Out-Null
}

Write-Host ("[remote] 打包 {0}:{1} -> {2}" -f $Server, $RemotePm2Dir, $RemoteArchive)
$remoteCmd = "set -e; LOG_DIR=$RemotePm2Dir; if [ ! -d $RemotePm2Dir ]; then echo 'PM2 log dir not found: $RemotePm2Dir' >&2; exit 1; fi; tar -czf $RemoteArchive -C $RemotePm2Dir ."
ssh -p $Port ("{0}@{1}" -f $User, $Server) "$remoteCmd"

Write-Host ("[download] -> {0}" -f $LocalArchive)
scp -P $Port ("{0}@{1}:{2}" -f $User, $Server, $RemoteArchive) "$LocalArchive"

Write-Host "[remote] 清理临时包"
ssh -p $Port ("{0}@{1}" -f $User, $Server) ("rm -f {0}" -f $RemoteArchive)

Write-Host ("完成。日志压缩包：{0}" -f $LocalArchive)
Write-Host ("解压示例：tar -xzf `"{0}`" -C `"{1}`"" -f $LocalArchive, (Resolve-Path $LocalDir))
