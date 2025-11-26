# 下载服务器留言文件到本地（当前目录）。
# 需本机有 scp；密码登录时运行后输入密码，或用 SSH 密钥免密。

$Server = "123.56.97.173"
$User   = "root"
$Port   = 22
$Remote = "/www/wwwroot/message.json"
$Local  = ".\\messages.json"
$Tmp    = ".\\messages.tmp.json"

# 确认 scp 是否可用
$scpCmd = Get-Command scp -ErrorAction SilentlyContinue
if (-not $scpCmd) {
    Write-Error "未找到 scp，请先安装（如安装 Git for Windows 或 OpenSSH 客户端）。"
    exit 1
}

Write-Host ("拉取 {0}@{1}:{2} -> {3}" -f $User, $Server, $Remote, $Local)
scp -P $Port ("{0}@{1}:{2}" -f $User, $Server, $Remote) "$Tmp"

# 读取 JSON 数组工具
function Read-JsonArray($Path) {
    if (-not (Test-Path $Path)) { return @() }
    try {
        $raw = Get-Content -LiteralPath $Path -Raw
        $parsed = $raw | ConvertFrom-Json
        if ($parsed -is [System.Collections.IEnumerable]) { return $parsed }
        return @()
    } catch {
        Write-Warning ("读取 JSON 失败：{0}" -f $_.Exception.Message)
        return @()
    }
}

# 读取本地与远端数据
$localData  = Read-JsonArray $Local
$remoteData = Read-JsonArray $Tmp

# 定义唯一键：优先 id，否则 timestamp+name
function Get-Key($item) {
    if ($item.id) { return $item.id }
    return "{0}-{1}" -f $item.timestamp, $item.name
}

$localKeys = $localData | ForEach-Object { Get-Key $_ }
$remoteNew = @()
foreach ($item in $remoteData) {
    $key = Get-Key $item
    if ($localKeys -notcontains $key) {
        $remoteNew += $item
    }
}

# 合并并写回：保留本地，追加远端新增
$merged = @()
$merged += $localData
$merged += $remoteNew
$merged | ConvertTo-Json -Depth 10 | Out-File -LiteralPath $Local -Encoding UTF8

# 输出新增条目
if ($remoteNew.Count -gt 0) {
    Write-Host ("发现 {0} 条新留言：" -f $remoteNew.Count)
    $remoteNew | ForEach-Object {
        Write-Host ("- [{0}] {1} ({2}) => {3}" -f $_.timestamp, $_.name, $_.email, $_.message)
    }
} else {
    Write-Host "没有发现新的留言。"
}

# 清理临时文件
Remove-Item -LiteralPath $Tmp -ErrorAction SilentlyContinue
Write-Host "同步完成，已更新 $Local"
