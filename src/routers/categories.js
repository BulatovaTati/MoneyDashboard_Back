import { Router } from 'express';
import { getCategories } from '../controllers/categories.js';
import { validateCategoryType } from '../middlewares/getCategories.js';

const categoriesRouter = Router();

categoriesRouter.get('/', validateCategoryType, getCategories);

export default categoriesRouter;

//moneydashboard-back.onrender.com/api/transaction-categories
// Отримати категорії транзакцій
