import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';

export const registerUser = async (payload) => {
  const existingUser = await UsersCollection.findOne({ email: payload.email });
  if (existingUser) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  const newUser = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  const accessToken = generateAccessToken(newUser._id.toString());
  const refreshToken = generateRefreshToken(newUser._id.toString());

  return {
    user: {
      email: newUser.email,
      name: newUser.name,
    },
    accessToken,
    refreshToken,
  };
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Invalid credentials');

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return {
    user: {
      email: user.email,
      name: user.name,
    },
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async () => {
  return { message: 'Logged out successfully' };
};

export const getCurrentUser = async (userId) => {
  const user = await UsersCollection.findById(userId).select('-password');

  if (!user) throw createHttpError(404, 'User not found');

  return {
    email: user.email,
    name: user.name,
  };
};
