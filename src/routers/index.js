import { Router } from 'express';
import transactionsRouter from './transactions.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import summaryRouter from './summary.js';
import categoriesRouter from './categories.js';

const router = Router();

//moneydashboard-back.onrender.com/api/auth/
router.use('/auth', authRouter);
//moneydashboard-back.onrender.com/api/transactions/
router.use('/transactions', transactionsRouter);
router.use('/users', usersRouter);
//moneydashboard-back.onrender.com/api/transaction-categories
router.use('/transaction-categories', categoriesRouter);
//moneydashboard-back.onrender.com/api/transactions-summary
router.use('/transactions-summary', summaryRouter);

export default router;
