import { Router } from 'express';

const summaryRouter = Router();

// Отримати звітність за період
summaryRouter.get('/');

export default summaryRouter;
