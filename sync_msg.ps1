# 下载服务器留言文件到本地（当前目录）。
# 需本机有 scp；密码登录时运行后输入密码，或用 SSH 密钥免密。

$Server = "123.56.97.173"
$User   = "root"
$Port   = 22
$Remote = "/www/wwwroot/message.json"
$Local  = ".\\messages.json"

# 确认 scp 是否可用
$scpCmd = Get-Command scp -ErrorAction SilentlyContinue
if (-not $scpCmd) {
    Write-Error "未找到 scp，请先安装（如安装 Git for Windows 或 OpenSSH 客户端）。"
    exit 1
}

Write-Host ("拉取 {0}@{1}:{2} -> {3}" -f $User, $Server, $Remote, $Local)
scp -P $Port ("{0}@{1}:{2}" -f $User, $Server, $Remote) "$Local"
Write-Host "已下载到 $Local"
