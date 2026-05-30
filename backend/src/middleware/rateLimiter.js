import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    code: 429,
    status: 'failed',
    message: 'Terlalu banyak permintaan coba lagi dalam 15 menit',
    data: null,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const screeningLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 jam
  max: 10,
  message: {
    code: 429,
    status: 'failed',
    message: 'Batas skrining tercapai, coba lagi dalam 1 jam.',
    data: null,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    code: 429,
    status: 'failed',
    message: 'Terlalu banyak percobaan login, coba lagi dalam 15 menit.',
    data: null,
  },
  standardHeaders: true,
  legacyHeaders: false,
});
