# Nginx 301 重定向配置指南

## 问题
www 和非 www 两个域名都能访问，造成 SEO 权重分裂和重复内容问题。

## 解决方案
在 Nginx 配置中添加 301 重定向，将 `starthermatech.com` 统一重定向到 `www.starthermatech.com`。

## Nginx 配置示例

### 方案 1：完整配置（推荐）

```nginx
# HTTP - 重定向到 HTTPS + www
server {
    listen 80;
    server_name starthermatech.com www.starthermatech.com;
    
    return 301 https://www.starthermatech.com$request_uri;
}

# HTTPS - 非 www 重定向到 www
server {
    listen 443 ssl http2;
    server_name starthermatech.com;
    
    ssl_certificate /etc/letsencrypt/live/starthermatech.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/starthermatech.com/privkey.pem;
    
    return 301 https://www.starthermatech.com$request_uri;
}

# HTTPS - www 主站点配置
server {
    listen 443 ssl http2;
    server_name www.starthermatech.com;
    
    ssl_certificate /etc/letsencrypt/live/starthermatech.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/starthermatech.com/privkey.pem;
    
    # SSL 优化配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # 静态文件目录
    root /www/wwwroot/thermatechWebsite/client/dist;
    index index.html;
    
    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;
    
    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API 反向代理到 Node.js
    location /api/ {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 方案 2：简化配置（如果已有反向代理）

在现有 server 块顶部添加：

```nginx
server {
    listen 443 ssl http2;
    server_name www.starthermatech.com starthermatech.com;
    
    # 非 www 重定向到 www
    if ($host = 'starthermatech.com') {
        return 301 https://www.starthermatech.com$request_uri;
    }
    
    # ... 其余配置 ...
}
```

⚠️ **注意：** `if` 指令在 Nginx 中有限制，方案 1 更安全可靠。

## 部署步骤

1. **SSH 连接服务器：**
   ```bash
   ssh root@syseng
   ```

2. **编辑 Nginx 配置：**
   ```bash
   # 找到配置文件（通常在以下位置之一）
   nano /etc/nginx/sites-available/starthermatech.com
   # 或
   nano /etc/nginx/conf.d/starthermatech.conf
   # 或
   nano /www/server/panel/vhost/nginx/starthermatech.com.conf  # 宝塔面板
   ```

3. **测试配置：**
   ```bash
   nginx -t
   ```

4. **重载 Nginx：**
   ```bash
   nginx -s reload
   # 或
   systemctl reload nginx
   ```

5. **验证重定向：**
   ```bash
   curl -I http://starthermatech.com
   # 应该看到：
   # HTTP/1.1 301 Moved Permanently
   # Location: https://www.starthermatech.com/
   
   curl -I https://starthermatech.com
   # 应该看到：
   # HTTP/2 301
   # Location: https://www.starthermatech.com/
   ```

## SEO 优化检查清单

- [x] 301 重定向配置（而非 302）
- [x] HTTP → HTTPS 重定向
- [x] 非 www → www 重定向
- [x] 保留原始路径（`$request_uri`）
- [ ] 更新 Google Search Console（添加 www 版本）
- [ ] 更新网站地图 URL
- [ ] 检查所有页面的 `<link rel="canonical">` 指向 www 版本

## 常见问题

### Q: 为什么不在 Express 应用中处理重定向？
A: 
1. Nginx 处理重定向更高效（避免 Node.js 进程开销）
2. 避免应用层逻辑错误导致重定向循环
3. SSL/TLS 终止通常在 Nginx 层，协议判断更准确
4. 符合标准架构实践

### Q: 重定向会影响现有用户吗？
A: 301 是永久重定向，浏览器和搜索引擎会自动跟随，用户无感知。旧链接依然有效。

### Q: 需要多久搜索引擎才能更新？
A: Google 通常 1-4 周完成索引更新。可以在 Search Console 手动请求重新抓取。

## 相关文件
- `server/index.js` - Express 应用（已移除重定向代码）
- `client/public/robots.txt` - 搜索引擎爬虫配置
- `client/public/sitemap.xml` - 网站地图（确保 URL 使用 www 版本）
