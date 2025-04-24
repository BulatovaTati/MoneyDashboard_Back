import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';
import { generateAccessToken } from '../utils/token.js';

export const registerUser = async (payload) => {
  const existingUser = await UsersCollection.findOne({ email: payload.email });
  if (existingUser) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
    balance: 0, // якщо немає дефолтного значення в схемі
  });

  const token = generateAccessToken(newUser._id.toString());

  return {
    user: {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      balance: newUser.balance,
    },
    token,
  };
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Invalid credentials');

  const token = generateAccessToken(user._id.toString());

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      balance: user.balance,
    },
    token,
  };
};
