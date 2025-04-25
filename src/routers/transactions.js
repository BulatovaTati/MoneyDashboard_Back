import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactions.js';
import {
  addTransactionsSchema,
  editTransactionsSchema,
} from '../validation/transactions.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const transactionsRouter = Router();

// GET all /transactions
transactionsRouter.get('/', authMiddleware, ctrlWrapper(getAllTransactions));

// POST /transactions
transactionsRouter.post(
  '/',
  authMiddleware,
  validateBody(addTransactionsSchema),
  ctrlWrapper(createTransaction),
);

// PATCH /transactions/:id
transactionsRouter.patch(
  '/:id',
  authMiddleware,
  validateBody(editTransactionsSchema),
  ctrlWrapper(updateTransaction),
);

// DELETE /transactions/:id
transactionsRouter.delete(
  '/:id',
  authMiddleware,
  ctrlWrapper(deleteTransaction),
);

export default transactionsRouter;
