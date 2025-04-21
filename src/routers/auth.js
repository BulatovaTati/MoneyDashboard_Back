import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const AuthRouter = Router();
//moneydashboard-back.onrender.com/api/auth/sign-up
// POST /auth/sign-up - реєстрація нового користувача
AuthRouter.post(
  '/sign-up',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
//moneydashboard-back.onrender.com/api/auth/sign-in
// POST /auth/sign-in - вхід користувача
AuthRouter.post(
  '/sign-in',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

// DELETE /auth/sign-out - вихід користувача
AuthRouter.delete('/sign-out', ctrlWrapper(logoutUserController)); // Визов методу в контролері

export default AuthRouter;
