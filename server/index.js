const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');
const fssync = require('fs');
const crypto = require('crypto');
const https = require('https');
const http = require('http');
const rateLimit = require('express-rate-limit');
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
app.use(cors());
app.use(express.json());

// Request logging (stdout -> PM2 logs)
app.use((req, res, next) => {
  const ua = req.get('User-Agent') || '-';
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl || req.url} - ${ua}`);
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

// Legacy redirect: /product/html/?*.html -> /products (SEO preservation)
app.use((req, res, next) => {
  const url = req.originalUrl || req.url || '';
  if (url.includes('/product/html/') || url.includes('/product/class/')) {
    return res.redirect(301, '/products');
  }
  next();
});

// 静态资源托管（生产模式：同一端口，同时提供前端和 API）
const distPath = path.join(__dirname, '..', 'client', 'dist');

// 明确处理 /products 路由，优先返回 products.html（包含 SEO 标签）而不是 products/ 目录
app.get('/products', (req, res) => {
  res.sendFile(path.join(distPath, 'products.html'));
});

// Serve pre-rendered HTML generated by vite-react-ssg (e.g., /products/faraday -> dist/products/faraday.html)
// maxAge: 0 禁用缓存，确保 SEO 标签更新立即生效
app.use(express.static(distPath, { extensions: ['html'], maxAge: 0, etag: false }));
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
