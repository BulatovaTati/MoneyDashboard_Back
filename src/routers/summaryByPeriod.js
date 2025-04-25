import { Router } from 'express';
import { getSummaryByPeriod } from '../controllers/summaryByPeriod.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const summaryByPeriodRouter = Router();

summaryByPeriodRouter.get('/', authMiddleware, ctrlWrapper(getSummaryByPeriod));

export default summaryByPeriodRouter;
