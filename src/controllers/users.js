import { getCurrentUser } from '../services/users.js';

export const getCurrentUserController = async (req, res) => {
  const user = await getCurrentUser(req.userId);

  res.json({
    status: 200,
    message: 'User info retrieved',
    data: user,
  });
};
