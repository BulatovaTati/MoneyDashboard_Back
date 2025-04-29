import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1500,
  message: {
    status: 429,
    message: 'Too many requests, please try again later.',
  },
});

export { limiter };
