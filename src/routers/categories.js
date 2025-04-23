import { Router } from 'express';
import { getCategories } from '../controllers/categories.js';
import { authMiddleware } from '../middlewares/authenticate.js';

const categoriesRouter = Router();

categoriesRouter.get('/', authMiddleware, getCategories);

export default categoriesRouter;

//moneydashboard-back.onrender.com/api/transaction-categories
// Отримати категорії транзакцій
