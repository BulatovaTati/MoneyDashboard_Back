import { Router } from 'express';

const summaryRouter = Router();

// Отримати звітність за період
//moneydashboard-back.onrender.com/api/transactions-summary
summaryRouter.get('/');

export default summaryRouter;
