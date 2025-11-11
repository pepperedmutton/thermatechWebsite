const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;
const MESSAGES_FILE_PATH = path.join(__dirname, 'data', 'messages.json');

// Middleware
app.use(cors());
app.use(express.json());

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
    id: Date.now(),
    timestamp: new Date().toISOString(),
    name,
    phone,
    email,
    message,
  };

  try {
    let messages = [];
    try {
      const data = await fs.readFile(MESSAGES_FILE_PATH, 'utf8');
      messages = JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, it will be created.
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    messages.unshift(newMessage); // Add new message to the beginning for chronological order

    await fs.writeFile(MESSAGES_FILE_PATH, JSON.stringify(messages, null, 2), 'utf8');

    res.status(201).json({ message: '留言已成功保存！' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: '服务器内部错误，无法保存留言。' });
  }
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
