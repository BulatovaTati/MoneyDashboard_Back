import { Router } from 'express';
import { getCategories } from '../controllers/categories.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const categoriesRouter = Router();

categoriesRouter.get('/', isAuthenticated, getCategories);

export default categoriesRouter;

//moneydashboard-back.onrender.com/api/transaction-categories
// Отримати категорії транзакцій
