const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');
const rateLimit = require('express-rate-limit');
const {
  ensureSchema,
  addMessage,
  exportMessages,
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

async function writeMessageDump(payload) {
  await Promise.all([
    saveMessages(MESSAGES_FILE_PATH, payload),
    saveMessages(WWWROOT_MESSAGES_FILE_PATH, payload).catch(error => {
      console.warn('Failed to write /www/wwwroot/message.json:', error.message);
    }),
  ]);
}

async function saveMessages(filePath, messages) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf8');
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

    const payload = await exportMessages();
    await writeMessageDump(payload);

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

// 静态资源托管（生产模式：同一端口，同时提供前端和 API）
const distPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

async function start() {
  try {
    await ensureSchema();
    const payload = await exportMessages();
    await writeMessageDump(payload);
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
