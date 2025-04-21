import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const getCurrentUser = async (userId) => {
  const user = await UsersCollection.findById(userId).select('-password');

  if (!user) throw createHttpError(404, 'User not found');

  return user;
};
