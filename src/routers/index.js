import { Router } from 'express';
import transactionsRouter from './transactions.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import summaryRouter from './summary.js';
import categoriesRouter from './categories.js';

const router = Router();

router.use('/transactions', transactionsRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/transactions-summary', summaryRouter);
router.use('/transaction-categories', categoriesRouter);

export default router;
