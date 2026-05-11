// A simple in-memory rate limiter
const tracker = new Map();

export const rateLimiter = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 10;     // Max 10 requests per minute

  if (!tracker.has(ip)) {
    tracker.set(ip, { count: 1, startTime: now });
    return next();
  }

  const data = tracker.get(ip);

  if (now - data.startTime > windowMs) {
    tracker.set(ip, { count: 1, startTime: now });
    return next();
  }

  if (data.count >= maxRequests) {
    return res.status(429).json({ error: "Too many requests. Please slow down." });
  }

  data.count++;
  next();
};