import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 100, // максимум 100 запитів з одного IP
  message: {
    status: 429,
    message: 'Too many requests, please try again later.',
  },
});

export { limiter };
