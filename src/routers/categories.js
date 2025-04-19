import { Router } from 'express';

const categoriesRouter = Router();
//moneydashboard-back.onrender.com/api/transaction-categories
// Отримати категорії транзакцій
categoriesRouter.get('/');

export default categoriesRouter;
