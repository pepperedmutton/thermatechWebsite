// Vercel Serverless Function for Contact Form
import fs from 'fs/promises';
import path from 'path';

const MESSAGES_FILE_PATH = path.join(process.cwd(), 'server', 'data', 'messages.json');

// Simple rate limiting for serverless
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 10;

function checkRateLimit(ip) {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  
  // Clean old requests
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT_MAX) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Rate limiting
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ message: '您已达到请求频率上限，请稍后再试。' });
  }

  const { name, phone, email, message, honeypot } = req.body;

  // Honeypot check
  if (honeypot) {
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
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    messages.unshift(newMessage);

    // Ensure directory exists
    await fs.mkdir(path.dirname(MESSAGES_FILE_PATH), { recursive: true });
    await fs.writeFile(MESSAGES_FILE_PATH, JSON.stringify(messages, null, 2), 'utf8');

    res.status(201).json({ message: '留言已成功保存！' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: '服务器内部错误，无法保存留言。' });
  }
}