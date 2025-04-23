import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createTransaction, getAllTransactions, updateTransaction, deleteTransaction } from '../controllers/transactions.js';
import { addTransactionsSchema, editTransactionsSchema } from '../validation/transactions.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const transactionsRouter = Router();

// GET all /transactions
transactionsRouter.get('/', isAuthenticated, getAllTransactions);

// POST /transactions
transactionsRouter.post('/', isAuthenticated, validateBody(addTransactionsSchema), createTransaction);

// PATCH /transactions/:id
transactionsRouter.patch('/:id', isAuthenticated, validateBody(editTransactionsSchema), updateTransaction);

// DELETE /transactions/:id
transactionsRouter.delete('/:id', isAuthenticated, deleteTransaction);

export default transactionsRouter;
