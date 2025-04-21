/* eslint-disable no-unused-vars */
import createHttpError from 'http-errors';
import { verifyToken } from '../utils/token.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return next(createHttpError(401, 'No token provided'));
  }

  try {
    const decoded = verifyToken(token);
    const user = await UsersCollection.findById(decoded.userId);

    if (!user) throw createHttpError(401, 'User not found');

    req.user = user;
    next();
  } catch (error) {
    return next(createHttpError(401, 'Invalid or expired token'));
  }
};
