import { getSummaryService } from '../services/summary.js';
import createHttpError from 'http-errors';

export const getSummary = async (req, res, next) => {
  try {
    const { userId } = req;
    const { period } = req.query;

    if (!period) {
      return next(createHttpError(400, 'Parameter "period" is required in the format YYYY-MM'));
    }

    const [year, month] = period.split('-');
    if (!year || !month || year.length !== 4 || month.length !== 2 || isNaN(Number(year)) || isNaN(Number(month)) || Number(month) < 1 || Number(month) > 12) {
      return next(createHttpError(400, 'Invalid "period" format. Use YYYY-MM'));
    }

    const summaryData = await getSummaryService(userId, Number(year), Number(month));

    res.status(200).json(summaryData);
  } catch (error) {
    next(createHttpError(500, 'Error fetching summary', { expose: false }));
  }
};
