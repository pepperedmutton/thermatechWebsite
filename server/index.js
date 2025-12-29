const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');
const fssync = require('fs');
const crypto = require('crypto');
const https = require('https');
const http = require('http');
const rateLimit = require('express-rate-limit');
const geoip = require('geoip-lite');
const {
  ensureSchema,
  addMessage,
} = require('./db/knex');

// ====== Production config (edit here, no .env) ======
const CONFIG = {
  HTTP_PORT: 80,
  HTTPS_PORT: 443,
  SSL_CERT: '/etc/letsencrypt/live/starthermatech.com/fullchain.pem',
  SSL_KEY: '/etc/letsencrypt/live/starthermatech.com/privkey.pem',
};

const app = express();
const HTTP_PORT = CONFIG.HTTP_PORT;
const HTTPS_PORT = CONFIG.HTTPS_PORT;
const MESSAGES_FILE_PATH = path.join(__dirname, 'data', 'messages.json');
// Also write a copy to the message.json located one level above the project root (sibling of thermatechWebsite).
// This uses a path relative to the repo: <repo parent>/message.json
const WWWROOT_MESSAGES_FILE_PATH = path.resolve(__dirname, '..', '..', 'message.json');

function generateUniqueId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return crypto.randomBytes(16).toString('hex');
}

async function appendMessageDump(entries) {
  const list = Array.isArray(entries) ? entries : [entries];
  await Promise.all([
    appendMessages(MESSAGES_FILE_PATH, list),
    appendMessages(WWWROOT_MESSAGES_FILE_PATH, list).catch(error => {
      console.warn('Failed to write /www/wwwroot/message.json:', error.message);
    }),
  ]);
}

async function appendMessages(filePath, newEntries) {
  const entries = Array.isArray(newEntries) ? newEntries : [newEntries];
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });

  // Read existing content; if file is missing, start with empty array
  let content = '';
  try {
    content = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`Messages file not found, initialize empty: ${filePath}`);
      content = '[]\n';
    } else {
      throw error;
    }
  }

  // Parse existing entries with recovery for malformed content
  let existing = [];
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      existing = parsed;
    } else {
      throw new Error('Not an array');
    }
  } catch (error) {
    // Try to salvage JSON objects from the content to avoid losing data
    const matches = content.match(/\{[\s\S]*?\}/g) || [];
    const recovered = [];
    for (const block of matches) {
      try {
        recovered.push(JSON.parse(block));
      } catch (innerError) {
        // ignore individual parse errors
      }
    }
    if (recovered.length > 0) {
      console.warn(`Messages file invalid JSON, recovered ${recovered.length} item(s): ${filePath} (${error.message})`);
      existing = recovered;
    } else {
      console.warn(`Messages file invalid JSON, reinitialize to []: ${filePath} (${error.message})`);
      existing = [];
    }
  }

  const merged = existing.concat(entries);
  const serialized = JSON.stringify(merged, null, 2);
  await fs.writeFile(filePath, `${serialized}\n`, 'utf8');
}

// Middleware
// 启用 Gzip 压缩（必须在其他中间件之前）
app.use(compression({
  filter: (req, res) => {
    // 压缩所有可压缩的内容
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6, // 压缩级别 0-9，6 是默认值（平衡速度和压缩率）
}));

app.use(cors());
app.use(express.json());

// 获取客户端真实 IP（考虑代理和负载均衡）
function getClientIp(req) {
  return (
    req.headers['cf-connecting-ip'] ||        // Cloudflare
    req.headers['x-real-ip'] ||               // Nginx proxy
    req.headers['x-forwarded-for']?.split(',')[0].trim() || // 代理链
    req.socket.remoteAddress ||
    req.connection.remoteAddress
  );
}

// 获取 IP 地理位置信息
function getGeoInfo(ip) {
  if (!ip) return 'Unknown';
  
  // 移除 IPv6 前缀（如 ::ffff:）
  const cleanIp = ip.replace(/^::ffff:/, '');
  
  // 本地 IP 特殊处理
  if (cleanIp === '127.0.0.1' || cleanIp === '::1' || cleanIp.startsWith('192.168.') || cleanIp.startsWith('10.')) {
    return 'Local';
  }
  
  const geo = geoip.lookup(cleanIp);
  if (!geo) return `Unknown(${cleanIp})`;
  
  // 格式化地理位置信息：国家-地区-城市
  const parts = [];
  if (geo.country) parts.push(geo.country);
  if (geo.region) parts.push(geo.region);
  if (geo.city) parts.push(geo.city);
  
  const location = parts.length > 0 ? parts.join('-') : 'Unknown';
  return `${location}(${cleanIp})`;
}

// 静态资源文件扩展名列表（不记录这些请求）
const STATIC_EXTENSIONS = [
  '.js', '.css', '.map',           // 代码文件
  '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico', '.bmp', // 图片
  '.woff', '.woff2', '.ttf', '.eot', '.otf',  // 字体
  '.mp4', '.webm', '.ogg', '.mp3', '.wav',    // 媒体
  '.pdf', '.zip', '.rar',          // 文档/压缩包
  '.txt', '.xml', '.json',         // 数据文件（某些情况）
];

// 检查是否为静态资源请求
function isStaticResource(url) {
  const pathname = url.split('?')[0]; // 移除查询参数
  return STATIC_EXTENSIONS.some(ext => pathname.toLowerCase().endsWith(ext));
}

// Request logging with IP geolocation (stdout -> PM2 logs)
// 过滤掉静态资源请求，只记录页面和 API 访问
app.use((req, res, next) => {
  // 跳过静态资源的日志记录
  if (isStaticResource(req.originalUrl || req.url)) {
    return next();
  }
  
  const ua = req.get('User-Agent') || '-';
  const clientIp = getClientIp(req);
  const geoInfo = getGeoInfo(clientIp);
  
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl || req.url} | IP: ${geoInfo} | UA: ${ua}`);
  next();
});

// Rate Limiting Middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { message: '您已达到请求频率上限，请稍后再试。' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to API calls only
app.use('/api', apiLimiter);

// API routes
app.post('/api/contact', async (req, res) => {
  const { name, phone, email, message, honeypot } = req.body;

  // Honeypot check
  if (honeypot) {
    // This is likely a bot, send a success response but don't save the data
    return res.status(201).json({ message: '留言已成功保存！' });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ message: '姓名、邮箱和留言内容不能为空。' });
  }

  const newMessage = {
    name,
    phone,
    email,
    message,
    created_at: new Date().toISOString(),
  };
  const uniqueId = generateUniqueId();

  try {
    const saved = await addMessage({
      ...newMessage,
      source: 'contact-form',
      is_bot: false,
    });

    const timestamp =
      saved?.created_at instanceof Date
        ? saved.created_at.toISOString()
        : saved?.created_at || newMessage.created_at;

    await appendMessageDump({
      id: uniqueId,
      timestamp,
      name,
      phone,
      email,
      message,
    });

    res.status(201).json({
      message: '留言已成功保存！',
      id: saved?.id,
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: '服务器内部错误，无法保存留言。' });
  }
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// 1. 域名规范化重定向：www.starthermatech.com -> starthermatech.com (统一主站)
// 【重要】这确保所有流量都指向非 www 版本，避免权重分散和重复收录
app.use((req, res, next) => {
  const host = req.headers.host || '';
  // 如果访问的是 www 域名，强制 301 重定向到非 www 版本
  if (host.startsWith('www.')) {
    const newHost = host.replace(/^www\./, '');
    const protocol = req.secure || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
    return res.redirect(301, `${protocol}://${newHost}${req.originalUrl}`);
  }
  next();
});

// 2. 旧 URL 路径重定向映射（SEO 保护）
const legacyRedirects = {
  // 旧产品页面路径
  '/product/html/langmuir.html': '/products/langmuir',
  '/product/html/faraday.html': '/products/faraday',
  '/product/html/exb.html': '/products/exb',
  '/product/html/rpa.html': '/products/rpa',
  '/product/html/kaufman.html': '/products/kaufman',
  '/product/html/hall.html': '/products/hall-source',
  '/product/html/cathode-arc.html': '/products/cathode-arc',
  '/product/html/rf.html': '/products/rfis',
  '/product/html/oes.html': '/products/oes',
  '/product/html/lif.html': '/products/lif',
  '/product/html/thomson.html': '/products/thomson',
  '/product/html/balance.html': '/products/em-balance',
  '/product/html/torsion.html': '/products/torsion-balance',
  
  // 旧目录结构
  '/product/class/contact.html': '/products',
  '/product/class/diagnostic.html': '/products',
  '/product/class/ion-source.html': '/products',
  '/product/class/thrust.html': '/products',
  
  // 其他旧路径
  '/about.html': '/about',
  '/contact.html': '/contact',
  '/news.html': '/news',
  '/index.html': '/',
  '/home.html': '/',
};

// 应用旧 URL 重定向
app.use((req, res, next) => {
  const url = req.originalUrl || req.url || '';
  const cleanUrl = url.split('?')[0]; // 移除查询参数
  
  // 精确匹配重定向
  if (legacyRedirects[cleanUrl]) {
    return res.redirect(301, legacyRedirects[cleanUrl]);
  }
  
  // 通配符重定向：任何 /product/html/ 或 /product/class/ 路径
  if (url.includes('/product/html/') || url.includes('/product/class/')) {
    return res.redirect(301, '/products');
  }
  
  next();
});

// 静态资源托管（生产模式：同一端口，同时提供前端和 API）
const distPath = path.join(__dirname, '..', 'client', 'dist');

// === 关键 SEO 修复：显式处理所有列表页/栏目页路由 ===
// 确保这些路径返回正确的预渲染 HTML，而不是回落到 index.html
// 这对搜索引擎抓取至关重要！

// 1. 中文路由
app.get('/products', (req, res) => {
  res.sendFile(path.join(distPath, 'products.html'));
});
app.get('/news', (req, res) => {
  res.sendFile(path.join(distPath, 'news.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(distPath, 'about.html'));
});
app.get('/join', (req, res) => {
  res.sendFile(path.join(distPath, 'join.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(distPath, 'contact.html'));
});
app.get('/sitemap', (req, res) => {
  res.sendFile(path.join(distPath, 'sitemap.html'));
});

// 2. 英文路由 (/en/*)
// 【重要】/en 根路径必须返回英文首页
app.get('/en', (req, res) => {
  res.sendFile(path.join(distPath, 'en.html'));
});
app.get('/en/products', (req, res) => {
  res.sendFile(path.join(distPath, 'en', 'products.html'));
});
app.get('/en/news', (req, res) => {
  res.sendFile(path.join(distPath, 'en', 'news.html'));
});
app.get('/en/about', (req, res) => {
  res.sendFile(path.join(distPath, 'en', 'about.html'));
});
app.get('/en/join', (req, res) => {
  res.sendFile(path.join(distPath, 'en', 'join.html'));
});
app.get('/en/contact', (req, res) => {
  res.sendFile(path.join(distPath, 'en', 'contact.html'));
});
app.get('/en/sitemap', (req, res) => {
  res.sendFile(path.join(distPath, 'en', 'sitemap.html'));
});

// 3. 日文路由 (/ja/*)
// 【重要】/ja 根路径必须返回日文首页
app.get('/ja', (req, res) => {
  res.sendFile(path.join(distPath, 'ja.html'));
});
app.get('/ja/products', (req, res) => {
  res.sendFile(path.join(distPath, 'ja', 'products.html'));
});
app.get('/ja/news', (req, res) => {
  res.sendFile(path.join(distPath, 'ja', 'news.html'));
});
app.get('/ja/about', (req, res) => {
  res.sendFile(path.join(distPath, 'ja', 'about.html'));
});
app.get('/ja/join', (req, res) => {
  res.sendFile(path.join(distPath, 'ja', 'join.html'));
});
app.get('/ja/contact', (req, res) => {
  res.sendFile(path.join(distPath, 'ja', 'contact.html'));
});
app.get('/ja/sitemap', (req, res) => {
  res.sendFile(path.join(distPath, 'ja', 'sitemap.html'));
});

// 4. 俄文路由 (/ru/*)
// 【重要】/ru 根路径必须返回俄文首页
app.get('/ru', (req, res) => {
  res.sendFile(path.join(distPath, 'ru.html'));
});
app.get('/ru/products', (req, res) => {
  res.sendFile(path.join(distPath, 'ru', 'products.html'));
});
app.get('/ru/news', (req, res) => {
  res.sendFile(path.join(distPath, 'ru', 'news.html'));
});
app.get('/ru/about', (req, res) => {
  res.sendFile(path.join(distPath, 'ru', 'about.html'));
});
app.get('/ru/join', (req, res) => {
  res.sendFile(path.join(distPath, 'ru', 'join.html'));
});
app.get('/ru/contact', (req, res) => {
  res.sendFile(path.join(distPath, 'ru', 'contact.html'));
});
app.get('/ru/sitemap', (req, res) => {
  res.sendFile(path.join(distPath, 'ru', 'sitemap.html'));
});

// Serve sitemap.xml with correct Content-Type
app.get('/sitemap.xml', (req, res) => {
  res.set('Content-Type', 'application/xml');
  res.sendFile(path.join(distPath, 'sitemap.xml'));
});

// Serve robots.txt
app.get('/robots.txt', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.sendFile(path.join(distPath, 'robots.txt'));
});

// Serve pre-rendered HTML generated by vite-react-ssg (e.g., /products/faraday -> dist/products/faraday.html)
// maxAge: 0 禁用缓存，确保 SEO 标签更新立即生效
app.use(express.static(distPath, { extensions: ['html'], maxAge: 0, etag: false }));

// SPA fallback: 只在所有其他路由都不匹配时才返回 index.html
// 注意：这应该是最后一个路由处理器
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

async function start() {
  try {
    await ensureSchema();
    console.log('[db] In-memory Postgres (pg-mem + knex) ready');

    // 检查 SSL 证书是否存在
    const sslExists = fssync.existsSync(CONFIG.SSL_CERT) && fssync.existsSync(CONFIG.SSL_KEY);

    if (sslExists) {
      // HTTPS 服务器
      const httpsOptions = {
        cert: fssync.readFileSync(CONFIG.SSL_CERT),
        key: fssync.readFileSync(CONFIG.SSL_KEY),
      };
      https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
        console.log(`✓ HTTPS server running on port ${HTTPS_PORT}`);
      });

      // HTTP 服务器（重定向到 HTTPS）
      const redirectApp = express();
      redirectApp.use('*', (req, res) => {
        res.redirect(301, `https://${req.headers.host}${req.url}`);
      });
      http.createServer(redirectApp).listen(HTTP_PORT, () => {
        console.log(`✓ HTTP redirect server running on port ${HTTP_PORT}`);
      });
    } else {
      // 如果证书不存在，仅启动 HTTP 服务器
      console.warn('⚠ SSL certificates not found, running HTTP only');
      app.listen(HTTP_PORT, () => {
        console.log(`Server is running on HTTP port ${HTTP_PORT}`);
      });
    }
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
}

start();
