import { Router } from 'express';

const categoriesRouter = Router();

// Отримати категорії транзакцій
categoriesRouter.get('/');

export default categoriesRouter;
