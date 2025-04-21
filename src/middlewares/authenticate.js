import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';

const JWT_SECRET = getEnvVar('JWT_SECRET');

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      createHttpError(401, 'Authorization header missing or invalid'),
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(createHttpError(403, 'Token expired'));
    }

    return next(createHttpError(401, 'Invalid token'));
  }
};
