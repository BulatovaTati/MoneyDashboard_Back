import { Router } from 'express';

const AuthRouter = Router();
//moneydashboard-back.onrender.com/api/auth/sign-up
// POST /auth/sign-up - реєстрація нового користувача
AuthRouter.post('/sign-up');
//moneydashboard-back.onrender.com/api/auth/sign-in
// POST /auth/sign-in - вхід користувача
AuthRouter.post('/sign-in');

// DELETE /auth/sign-out - вихід користувача
AuthRouter.delete('/sign-out'); // Визов методу в контролері

export default AuthRouter;
