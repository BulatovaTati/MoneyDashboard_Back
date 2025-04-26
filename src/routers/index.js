import { Router } from 'express';
import transactionsRouter from './transactions.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import categoriesRouter from './categories.js';
import summaryRouter from './summary.js';
import summaryByPeriodRouter from './summaryByPeriod.js';

const router = Router();

//moneydashboard-back.onrender.com/api/auth/
router.use('/auth', authRouter);
//moneydashboard-back.onrender.com/api/transactions/
router.use('/transactions', transactionsRouter);
//moneydashboard-back.onrender.com/api/users/
router.use('/users', usersRouter);
//moneydashboard-back.onrender.com/api/transaction-categories
router.use('/transaction-categories', categoriesRouter);
//moneydashboard-back.onrender.com/api/transactions-summary
router.use('/transactions-summary', summaryRouter);
//moneydashboard-back.onrender.com/api/transactions-summary-by-period
router.use('/transactions-summary-by-period', summaryByPeriodRouter);

export default router;
