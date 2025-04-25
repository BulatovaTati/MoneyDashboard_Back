import { TransactionCollection } from '../db/models/transactions.js';
import { Types } from 'mongoose';

export const getIncomeAndExpenseSummaryByPeriod = async (
  userIdString,
  yearRaw,
  monthRaw,
) => {
  const userId = new Types.ObjectId(String(userIdString));

  const year = Number(yearRaw);
  const month = monthRaw != null ? Number(monthRaw) : null;

  let startDate, endDate;

  if (!month) {
    startDate = new Date(Date.UTC(year, 0, 1));
    endDate = new Date(Date.UTC(year + 1, 0, 1));
  } else {
    const m = month - 1;
    startDate = new Date(Date.UTC(year, m, 1));
    endDate = new Date(Date.UTC(year, m === 11 ? 0 : m + 1, 1));
    if (m === 11) endDate.setUTCFullYear(year + 1);
  }

  const summary = await TransactionCollection.aggregate([
    { $match: { userId, date: { $gte: startDate, $lt: endDate } } },
    { $group: { _id: '$type', total: { $sum: '$amount' } } },
  ]);

  let incomeSummaryByPeriod = 0;
  let expenseSummaryByPeriod = 0;

  summary.forEach(({ _id, total }) => {
    if (_id === 'INCOME') incomeSummaryByPeriod = total;
    if (_id === 'EXPENSE') expenseSummaryByPeriod = total;
  });

  return { incomeSummaryByPeriod, expenseSummaryByPeriod };
};
