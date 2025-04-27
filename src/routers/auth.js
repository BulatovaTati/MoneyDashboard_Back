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

AuthRouter.post(
  '/sign-up',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

AuthRouter.post(
  '/sign-in',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

AuthRouter.post('/sign-out', ctrlWrapper(logoutUserController));

export default AuthRouter;
