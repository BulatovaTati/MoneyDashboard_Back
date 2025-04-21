import { loginUser, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        user: user.user,
        token: user.token,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Error registering user',
      error: err.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const session = await loginUser(req.body);

    res.json({
      status: 200,
      message: 'Successfully logged in!',
      data: {
        user: session.user,
        token: session.token,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: 'Invalid credentials',
      error: err.message,
    });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    return res.status(200).json({ message: 'Successfully logged out' });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Error logging out',
      error: err.message,
    });
  }
};
