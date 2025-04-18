import { Router } from 'express';

const usersRouter = Router();

// Отримати інформацію про поточного користувача
usersRouter.get('/current');

export default usersRouter;
