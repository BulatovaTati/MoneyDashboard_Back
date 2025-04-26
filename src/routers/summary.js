import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getSummaryByCategories } from '../controllers/summary.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const summaryRouter = Router();

// Отримати витрати по категоріях за період
summaryRouter.get(
  '/categories',
  authMiddleware,
  ctrlWrapper(getSummaryByCategories),
);

export default summaryRouter;
