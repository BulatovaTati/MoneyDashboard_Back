import { getCurrentUser, loginUser, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
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
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
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
    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Error logging out',
      error: err.message,
    });
  }
};

export const getCurrentUserController = async (req, res) => {
  const user = await getCurrentUser(req.userId);

  res.json({
    status: 200,
    message: 'User info retrieved',
    data: user,
  });
};
