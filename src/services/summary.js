import { TransactionCollection } from '../db/models/transactions.js';
import { Types } from 'mongoose';
import getCategoriesService from './categories.js';

export const getExpenseSummaryByCategories = async (
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

  const categories = await getCategoriesService();
  const expenseCategories = categories.filter((cat) => cat.type === 'EXPENSE');

  const summary = await TransactionCollection.aggregate([
    {
      $match: {
        userId,
        type: 'EXPENSE',
        date: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: '$categoryId',
        total: { $sum: '$amount' },
      },
    },
  ]);

  const result = expenseCategories
    .map((category) => {
      const matched = summary.find((s) => s._id === category.id);
      return {
        category: category.name,
        total: matched ? matched.total : 0,
      };
    })
    .filter((item) => item.total > 0);
  return result;
};
