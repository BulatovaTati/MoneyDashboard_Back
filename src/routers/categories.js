import { Router } from 'express';
import { getCategories } from '../controllers/categories.js';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);

export default categoriesRouter;

//moneydashboard-back.onrender.com/api/transaction-categories
// Отримати категорії транзакцій
