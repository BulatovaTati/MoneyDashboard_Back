import { loginUser, registerUser } from '../services/auth.js';
import createHttpError from 'http-errors';

export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);

  if (!user) {
    throw createHttpError(500, 'Error registering user');
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      user: user.user,
      token: user.token,
    },
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  if (!session) {
    throw createHttpError(401, 'Invalid credentials');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in!',
    data: {
      user: session.user,
      token: session.token,
    },
  });
};

export const logoutUserController = async (req, res, next) => {
  return res.status(200).json({ message: 'Successfully logged out' });
};
