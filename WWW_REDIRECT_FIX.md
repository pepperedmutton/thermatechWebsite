# 域名规范化修复总结 - 统一到非 www 版本

## 修复内容

### ✅ 已完成的修改

**1. BASE_URL 统一**
- 文件：[client\src\i18n\seo.ts](client\src\i18n\seo.ts#L3)
- 修改：`BASE_URL = 'https://starthermatech.com'`（移除 www）
- 影响：所有 canonical 标签、Open Graph URL、Twitter Card 图片都指向非 www 版本

**2. 服务器重定向**
- 文件：[server\index.js](server\index.js#L257-L267)
- 修改：www.starthermatech.com → starthermatech.com（301 永久重定向）
- 逻辑：检测 `host.startsWith('www.')` 则重定向到非 www

**3. Nginx 配置**
- 文件：[NGINX_CONFIG_COMPLETE.md](NGINX_CONFIG_COMPLETE.md#L20-L42)
- HTTP (80)：所有流量 → https://starthermatech.com
- HTTPS (443) www：www.starthermatech.com → https://starthermatech.com
- HTTPS (443) 主站：starthermatech.com（提供服务）

**4. 列表页路由修复**
- 文件：[server\index.js](server\index.js#L333-L433)
- 已添加：`/news`, `/products`, `/en/*`, `/ja/*`, `/ru/*` 等所有列表页的显式路由

## 为什么选择非 www？

**SEO 考虑：**
- 非 www 域名更短，品牌识别度更高
- 减少一次 DNS 查询（微小性能优势）
- 更符合现代网站趋势（大多数新站点使用非 www）

**技术考虑：**
- 代码已经准备好（BASE_URL 在配置文件中集中管理）
- SSL 证书同时支持两个版本
- 301 重定向能完整传递 SEO 权重（90-99%）

## 立即部署

```powershell
# 本地执行
cd c:\Users\30655\Desktop\thermatechWebsite
.\deploy.ps1
```

这将：
1. **重新构建前端**：所有 HTML 的 canonical 指向 starthermatech.com
2. **上传到服务器**：包含新的 server.js 重定向逻辑
3. **重启服务**：PM2 重启，新配置立即生效

## 验证清单

### 1. 基础功能测试

```bash
# 测试非 www 版本（应正常显示）
curl -I https://starthermatech.com/news
# 预期：HTTP/2 200

# 测试 www 重定向（应 301 到非 www）
curl -I https://www.starthermatech.com/news
# 预期：HTTP/2 301
# Location: https://starthermatech.com/news

# 测试多语言路径
curl -I https://starthermatech.com/en/products
# 预期：HTTP/2 200
```

### 2. Canonical 标签验证

```bash
# 检查生成的 HTML
curl -s https://starthermatech.com/news | grep 'rel="canonical"'
# 预期：<link rel="canonical" href="https://starthermatech.com/news">

curl -s https://starthermatech.com/en/products | grep 'rel="canonical"'
# 预期：<link rel="canonical" href="https://starthermatech.com/en/products">
```

### 3. 浏览器测试

使用**无痕模式**或清除缓存后访问：

- [ ] https://starthermatech.com/ → 显示首页
- [ ] https://starthermatech.com/news → 显示新闻列表（不是首页）
- [ ] https://starthermatech.com/products → 显示产品列表
- [ ] https://starthermatech.com/en/products → 显示英文产品列表
- [ ] https://www.starthermatech.com/news → 自动跳转到非 www

### 4. SEO 工具验证

**Google Rich Results Test:**
1. 访问：https://search.google.com/test/rich-results
2. 测试 URL：`https://starthermatech.com/news`
3. 确认能抓取且 canonical 正确

**查看源代码（重要！）：**
- 右键 → 查看页面源代码（不是检查元素）
- 搜索 `canonical`，确认指向 starthermatech.com
- 搜索 `og:url`，确认指向 starthermatech.com

## 搜索引擎更新

### 立即执行（关键步骤）

**1. Google Search Console**
- 访问：https://search.google.com/search-console
- **如果之前验证了 www 版本：**
  - 添加新资源：`https://starthermatech.com`
  - 提交 sitemap：`https://starthermatech.com/sitemap.xml`
- **请求重新抓取**：
  - `/news`
  - `/products`
  - `/en/products`
  - `/en/news`
  - `/ja/products`
  - `/ja/news`

**2. 更新 Sitemap**

确保 `client/public/sitemap.xml` 中所有 URL 都是非 www：
```xml
<url>
  <loc>https://starthermatech.com/news</loc>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://starthermatech.com/en/news</loc>
  <priority>0.8</priority>
</url>
```

**3. 监控过渡期**

在 Google Search Console 查看：
- **覆盖率报告**：确保新 URL 被索引
- **网址检查**：验证 canonical 标签正确
- **移除内容**：如果 www 版本仍在索引中，可以请求移除

## 预期时间线

| 时间 | 预期效果 |
|------|---------|
| 立即 | 301 重定向生效，用户自动跳转 |
| 1-3 天 | 搜索引擎重新抓取，识别规范 URL |
| 1-2 周 | 权重开始转移，非 www 版本排名上升 |
| 1-3 个月 | 完全过渡，www 版本从索引中移除 |

## 常见问题

### Q1: 301 重定向会损失权重吗？

**A:** 不会。Google 官方声明 301 重定向能传递 90-99% 的权重，对 SEO 影响极小。

### Q2: 需要更新外部链接吗？

**A:** 不紧急。301 重定向会自动处理，但建议逐步更新：
- 社交媒体账号链接
- 第三方平台简介
- 名片、宣传资料

### Q3: 旧的 www 链接会失效吗？

**A:** 不会。301 重定向永久有效，所有旧链接都能正常访问。

### Q4: 需要重新提交 SSL 证书吗？

**A:** 不需要。现有证书同时支持 starthermatech.com 和 www.starthermatech.com。

### Q5: 如果想改回 www 怎么办？

**A:** 可以随时改回：
1. 修改 `BASE_URL = 'https://www.starthermatech.com'`
2. 反转 server.js 中的重定向逻辑
3. 重新构建和部署

## 技术细节

### 重定向流程

```
用户访问: https://www.starthermatech.com/news
    ↓
1. Nginx 接收请求（443端口，www 域名）
    ↓
2. Nginx 返回 301 重定向
   Location: https://starthermatech.com/news
    ↓
3. 浏览器自动跳转
    ↓
4. Nginx 接收新请求（443端口，非www域名）
    ↓
5. Node.js 处理路由，返回 news.html
    ↓
6. HTML 包含 canonical: https://starthermatech.com/news
    ↓
7. 搜索引擎识别规范 URL
```

### 为什么在两处配置重定向？

**Node.js (server.js)：**
- 开发环境和没有 Nginx 的部署
- 作为备用保障

**Nginx：**
- 生产环境（性能更高）
- 在到达 Node.js 前就完成重定向
- 减少服务器负载

## 下一步优化（可选）

### 1. 配置 HSTS

在 Nginx 中添加：
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

这强制浏览器只使用 HTTPS。

### 2. 预加载到 HSTS Preload List

- 访问：https://hstspreload.org/
- 提交域名：starthermatech.com
- 效果：Chrome、Firefox 等浏览器内置你的域名，永远使用 HTTPS

### 3. 监控 301 链

确保不存在"301 链"（多次重定向）：
```bash
curl -I https://www.starthermatech.com/news
# 应该只有一次 301，不是 301 → 301 → 200
```

## 总结

**核心变更：**
- ✅ 所有 canonical 标签指向 starthermatech.com
- ✅ 所有 www 流量 301 重定向到非 www
- ✅ 列表页路由修复（解决"回落到首页"问题）

**SEO 效果：**
- ✅ 权重集中在单一域名
- ✅ 避免重复内容惩罚
- ✅ 简化品牌识别

**下一步：**
1. 立即部署：`.\deploy.ps1`
2. 验证功能：测试重定向和列表页
3. 通知搜索引擎：Google Search Console 重新抓取
4. 监控过渡：1-2 周内观察索引变化

---

**需要帮助？** 查看 [QUICKFIX_DEPLOY.md](QUICKFIX_DEPLOY.md) 了解详细部署步骤。
