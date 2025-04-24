import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { getSummary } from '../controllers/summary.js';

const summaryRouter = Router();

// Отримати звітність за період
//moneydashboard-back.onrender.com/api/transactions-summary
summaryRouter.get('/', isAuthenticated, getSummary);

export default summaryRouter;




