# Nginx 完整配置 - SEO 友好的 SSG/SPA 混合模式

## 问题诊断

**症状：** `/news`、`/en/products/`、`/ja/news/` 等路径返回的是首页内容，而不是对应的列表页内容。

**根本原因：**
1. SPA fallback 逻辑过于激进，所有未匹配路由都返回 `index.html`
2. 没有正确配置静态 HTML 文件的优先级
3. Nginx 或 Node.js 服务器没有正确处理多语言路径和列表页

**SEO 影响：**
- 搜索引擎看到多个 URL 返回相同内容（重复内容惩罚）
- 无法抓取列表页到详情页的链接（发现路径断裂）
- 降低整站抓取预算和收录质量

## 解决方案

### 方案 A：Nginx 直接托管静态文件（推荐）

这是最佳方案，性能最高，SEO 最友好。Nginx 直接提供预渲染的 HTML，Node.js 只处理 API。

```nginx
# /etc/nginx/sites-available/starthermatech.com
# 或 /www/server/panel/vhost/nginx/starthermatech.com.conf (宝塔面板)

# HTTP - 重定向到 HTTPS (非 www)
server {
    listen 80;
    server_name starthermatech.com www.starthermatech.com;
    
    return 301 https://starthermatech.com$request_uri;
}

# HTTPS - www 重定向到非 www
server {
    listen 443 ssl http2;
    server_name www.starthermatech.com;
    
    ssl_certificate /etc/letsencrypt/live/starthermatech.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/starthermatech.com/privkey.pem;
    
    return 301 https://starthermatech.com$request_uri;
}

# HTTPS - 主站点配置 (非 www)
server {
    listen 443 ssl http2;
    server_name starthermatech.com;
    
    # SSL 配置
    ssl_certificate /etc/letsencrypt/live/starthermatech.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/starthermatech.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # 静态文件根目录
    root /www/wwwroot/thermatechWebsite/client/dist;
    index index.html;
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               application/rss+xml font/truetype font/opentype 
               application/vnd.ms-fontobject image/svg+xml;
    gzip_min_length 1000;
    
    # ===== 关键 SEO 配置：静态 HTML 优先级 =====
    
    # 1. 精确匹配主要列表页（中文）
    location = /products {
        try_files /products.html =404;
    }
    location = /news {
        try_files /news.html =404;
    }
    location = /about {
        try_files /about.html =404;
    }
    location = /join {
        try_files /join.html =404;
    }
    location = /contact {
        try_files /contact.html =404;
    }
    location = /sitemap {
        try_files /sitemap.html =404;
    }
    
    # 2. 多语言路由 - 英文
    location = /en {
        try_files /en.html =404;
    }
    location = /en/products {
        try_files /en/products.html =404;
    }
    location = /en/news {
        try_files /en/news.html =404;
    }
    location = /en/about {
        try_files /en/about.html =404;
    }
    location = /en/join {
        try_files /en/join.html =404;
    }
    location = /en/contact {
        try_files /en/contact.html =404;
    }
    location = /en/sitemap {
        try_files /en/sitemap.html =404;
    }
    
    # 3. 多语言路由 - 日文
    location = /ja {
        try_files /ja.html =404;
    }
    location = /ja/products {
        try_files /ja/products.html =404;
    }
    location = /ja/news {
        try_files /ja/news.html =404;
    }
    location = /ja/about {
        try_files /ja/about.html =404;
    }
    location = /ja/join {
        try_files /ja/join.html =404;
    }
    location = /ja/contact {
        try_files /ja/contact.html =404;
    }
    location = /ja/sitemap {
        try_files /ja/sitemap.html =404;
    }
    
    # 4. 多语言路由 - 俄文
    location = /ru {
        try_files /ru.html =404;
    }
    location = /ru/products {
        try_files /ru/products.html =404;
    }
    location = /ru/news {
        try_files /ru/news.html =404;
    }
    location = /ru/about {
        try_files /ru/about.html =404;
    }
    location = /ru/join {
        try_files /ru/join.html =404;
    }
    location = /ru/contact {
        try_files /ru/contact.html =404;
    }
    location = /ru/sitemap {
        try_files /ru/sitemap.html =404;
    }
    
    # 5. API 反向代理到 Node.js (端口 3001，不再使用 80/443)
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # 6. 静态资源缓存策略
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # 7. SPA 通用路由（最后的 fallback）
    # 对于产品详情页（如 /products/langmuir）、新闻详情页（如 /news/rashid-langmuir-probe）
    # 先尝试对应的 .html 文件，不存在则回落到 index.html（客户端路由接管）
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }
}
```

### 方案 B：Node.js 服务器修复（已实施）

如果必须通过 Node.js 提供所有内容，需要显式处理每个列表页路由。

**已在 `server/index.js` 中实施：**
```javascript
// 显式处理所有列表页路由
app.get('/news', (req, res) => {
  res.sendFile(path.join(distPath, 'news.html'));
});
app.get('/en/products', (req, res) => {
  res.sendFile(path.join(distPath, 'en', 'products.html'));
});
// ... 等等
```

**注意：** 方案 B 性能较低，建议改用方案 A。

## 部署步骤

### 1. 更新 Node.js 服务器配置

服务器应该只监听 `3001` 端口（或其他非 80/443 的端口），只处理 API：

```javascript
// server/index.js 修改
const CONFIG = {
  HTTP_PORT: 3001,  // 改为 3001
  HTTPS_PORT: 3443, // 改为 3443 或移除 HTTPS（由 Nginx 处理）
  // SSL 配置可以移除，因为 Nginx 已经处理了 SSL
};
```

### 2. 修改 PM2 配置

```bash
# 停止现有进程
pm2 stop thermatech-site

# 更新环境变量（如果需要）
pm2 delete thermatech-site

# 重新启动（确保端口是 3001）
cd /www/wwwroot/thermatechWebsite/server
pm2 start index.js --name thermatech-site

# 保存配置
pm2 save
```

### 3. 应用 Nginx 配置

```bash
# 备份现有配置
sudo cp /etc/nginx/sites-available/starthermatech.com /etc/nginx/sites-available/starthermatech.com.backup

# 编辑配置（使用上面的完整配置）
sudo nano /etc/nginx/sites-available/starthermatech.com

# 测试配置
sudo nginx -t

# 如果测试通过，重载
sudo systemctl reload nginx
```

### 4. 验证修复

```bash
# 测试列表页（应该返回列表内容，不是首页）
curl -I https://www.starthermatech.com/news
curl https://www.starthermatech.com/news | grep "新闻资讯"

curl -I https://www.starthermatech.com/en/products
curl https://www.starthermatech.com/en/products | grep "Products"

curl -I https://www.starthermatech.com/ja/news
curl https://www.starthermatech.com/ja/news | grep "ニュース"

# 检查响应头（确保是 200，不是 302 或 404）
curl -I https://www.starthermatech.com/news
# 应该看到：HTTP/2 200
```

### 5. 搜索引擎重新抓取

修复后，立即通知搜索引擎重新抓取：

**Google Search Console：**
1. 访问 https://search.google.com/search-console
2. 选择属性 `www.starthermatech.com`
3. URL 检查工具 → 输入 URL → 请求编入索引
4. 对以下 URL 执行此操作：
   - `/news`
   - `/products`
   - `/en/products`
   - `/en/news`
   - `/ja/products`
   - `/ja/news`
   - `/ru/products`
   - `/ru/news`

**Bing Webmaster Tools：**
1. 访问 https://www.bing.com/webmasters
2. URL 提交 → 提交 URL

**百度资源平台：**
1. 访问 https://ziyuan.baidu.com
2. 数据引入 → 链接提交 → 手动提交
3. 提交所有重要列表页 URL

## 监控与验证

### 检查静态文件是否正确生成

```bash
cd /www/wwwroot/thermatechWebsite/client/dist

# 确认这些文件存在
ls -lh news.html products.html about.html
ls -lh en/news.html en/products.html
ls -lh ja/news.html ja/products.html
ls -lh ru/news.html ru/products.html
```

### 检查 HTML 内容

```bash
# 确认 news.html 包含新闻列表内容，不是首页 Hero
grep "新闻资讯" news.html
grep -i "hero" news.html  # 应该没有匹配

# 确认英文产品页包含英文内容
grep "Products" en/products.html
grep "等离子体" en/products.html  # 应该没有匹配
```

### 使用 Google Rich Results Test

验证结构化数据和 SEO 标签：
1. 访问 https://search.google.com/test/rich-results
2. 输入 URL：`https://www.starthermatech.com/news`
3. 确认能正确抓取内容和元标签

## 常见问题

### Q1: 修改后仍然看到首页内容？

**A:** 清除浏览器缓存和 CDN 缓存：
```bash
# 清除浏览器缓存（硬刷新）
# Chrome/Edge: Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)
# Firefox: Ctrl+F5 (Windows) 或 Cmd+Shift+R (Mac)

# 如果使用了 Cloudflare 等 CDN，需要清除 CDN 缓存
# Cloudflare: Dashboard → Caching → Configuration → Purge Everything
```

### Q2: 某些路径返回 404？

**A:** 确认对应的 HTML 文件已生成：
```bash
# 重新构建前端
cd /www/wwwroot/thermatechWebsite/client
npm run build

# 验证文件存在
ls -R dist/ | grep -E "\\.html$"
```

### Q3: API 调用失败？

**A:** 确认 Node.js 服务器运行在正确端口：
```bash
# 检查 PM2 进程
pm2 list
pm2 logs thermatech-site

# 测试 API 端点
curl http://localhost:3001/api/hello
```

### Q4: SSL 证书错误？

**A:** 确认 Nginx SSL 配置正确：
```bash
# 验证证书文件存在
ls -l /etc/letsencrypt/live/starthermatech.com/

# 测试 SSL
openssl s_client -connect www.starthermatech.com:443 -servername www.starthermatech.com
```

## 性能优化建议

1. **启用 HTTP/2 Server Push（可选）**
```nginx
http2_push_preload on;
```

2. **添加安全头**
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

3. **优化 Gzip 压缩级别**
```nginx
gzip_comp_level 6;  # 平衡压缩率和 CPU 使用
```

4. **启用 Brotli 压缩（需要安装模块）**
```nginx
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml;
```

## 总结

**核心原则：**
1. **静态 HTML 优先**：对于所有列表页和入口页，必须提供预渲染的 HTML
2. **精确路由匹配**：避免 SPA fallback 过早接管路由
3. **多语言路径显式处理**：每个语言的每个主要页面都需要明确配置
4. **Nginx 优于 Node.js**：静态内容由 Nginx 提供，性能和 SEO 都更好

**验证清单：**
- [ ] `/news` 返回新闻列表（不是首页）
- [ ] `/en/products` 返回英文产品列表
- [ ] `/ja/news` 返回日文新闻列表
- [ ] `/ru/products` 返回俄文产品列表
- [ ] HTTP 状态码都是 200（不是 302 或 404）
- [ ] 响应头包含正确的 `Content-Type: text/html`
- [ ] HTML 内容包含完整的 SEO 元标签
- [ ] Google Search Console 能正确抓取和索引

完成这些修复后，您的网站将对搜索引擎完全友好，每个列表页都能被正确抓取和索引。
