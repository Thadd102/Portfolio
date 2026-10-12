import crypto from 'crypto';
import { readDb } from './db.js';

export function createToken(username) {
  const db = readDb();
  const secret = db.auth.tokenSecret;
  const payload = {
    username,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days expiration
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payloadStr).digest('hex');
  return `${payloadStr}.${signature}`;
}

export function verifyToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadStr, signature] = parts;

  try {
    const db = readDb();
    const secret = db.auth.tokenSecret;
    const expectedSig = crypto.createHmac('sha256', secret).update(payloadStr).digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSig, 'hex'))) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf-8'));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch (err) {
    return null;
  }
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }

  req.user = user;
  next();
}
