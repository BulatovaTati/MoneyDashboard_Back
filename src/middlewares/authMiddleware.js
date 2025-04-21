import createHttpError from 'http-errors';
import { verifyAccessToken } from '../utils/token.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw createHttpError(401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);

    req.userId = payload.userId;
    next();
  } catch (err) {
    next(createHttpError(401, 'Invalid or expired token'));
  }
};
