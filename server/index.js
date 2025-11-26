const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');
const rateLimit = require('express-rate-limit');
const {
  ensureSchema,
  addMessage,
} = require('./db/knex');

// ====== Production config (edit here, no .env) ======
const CONFIG = {
  PORT: 80,
};

const app = express();
const PORT = CONFIG.PORT;
const MESSAGES_FILE_PATH = path.join(__dirname, 'data', 'messages.json');
// Also write a copy under /www/wwwroot/message.json for centralized access
const WWWROOT_MESSAGES_FILE_PATH = path.join(path.sep, 'www', 'wwwroot', 'message.json');

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
  let existing = [];
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  const merged = existing.concat(newEntries);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(merged, null, 2), 'utf8');
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
      id: saved?.id ?? Date.now(),
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
  if (url.includes('/product/html/')) {
    return res.redirect(301, '/products');
  }
  next();
});

// 静态资源托管（生产模式：同一端口，同时提供前端和 API）
const distPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

async function start() {
  try {
    await ensureSchema();
    console.log('[db] In-memory Postgres (pg-mem + knex) ready');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

start();
