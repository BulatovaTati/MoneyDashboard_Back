import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCurrentUserController } from '../controllers/users.js';

const usersRouter = Router();

// Отримати інформацію про поточного користувача
//moneydashboard-back.onrender.com/api/users/current
usersRouter.get(
  '/current',
  authMiddleware,
  ctrlWrapper(getCurrentUserController),
);

export default usersRouter;
