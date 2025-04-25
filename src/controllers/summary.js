import { getExpenseSummaryByCategories } from '../services/summary.js';
import createHttpError from 'http-errors';

export const getSummaryByCategories = async (req, res, next) => {
  const userId = req.user._id;
  const { year, month } = req.query;

  if (!year) {
    throw createHttpError(400, 'Missing required parameter: year');
  }

  const data = await getExpenseSummaryByCategories(userId, year, month);

  if (!data) {
    throw createHttpError(404, 'No data found');
  }

  res.status(200).json({
    status: 'success',
    message: 'Summary retrieved successfully',
    data,
  });
};
