import { getCurrentUser } from '../services/users.js';
import createHttpError from 'http-errors';

export const getCurrentUserController = async (req, res, next) => {
  const user = await getCurrentUser(req.user._id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 'success',
    message: 'User info retrieved',
    data: user,
  });
};
