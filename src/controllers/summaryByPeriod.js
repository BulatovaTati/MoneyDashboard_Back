import { getIncomeAndExpenseSummaryByPeriod } from '../services/summaryByPeriod.js';
import createHttpError from 'http-errors';

export const getSummaryByPeriod = async (req, res, next) => {
  const { year, month } = req.query;

  if (!req.user || !req.user._id) {
    throw createHttpError(401, 'User not authenticated');
  }

  const { _id: userId } = req.user;

  if (!year) {
    throw createHttpError(400, 'Year is required');
  }

  const summary = await getIncomeAndExpenseSummaryByPeriod(userId, year, month);

  res.status(200).json({
    status: 'success',
    data: summary,
  });
};
