import jwt from 'jsonwebtoken';
import { getEnvVar } from './getEnvVar.js';

const JWT_SECRET = getEnvVar('JWT_SECRET');
const ACCESS_TOKEN_EXPIRES_IN = '1m';

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
