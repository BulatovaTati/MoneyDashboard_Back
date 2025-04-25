import { Router } from 'express';
import { getCategories } from '../controllers/categories.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const categoriesRouter = Router();

categoriesRouter.get('/', authMiddleware, ctrlWrapper(getCategories));

export default categoriesRouter;
