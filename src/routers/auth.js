import { Router } from 'express';

const AuthRouter = Router();

// POST /auth/sign-up - реєстрація нового користувача
AuthRouter.post('/sign-up');

// POST /auth/sign-in - вхід користувача
AuthRouter.post('/sign-in');

// DELETE /auth/sign-out - вихід користувача
AuthRouter.delete('/sign-out'); // Визов методу в контролері

export default AuthRouter;
