import { TransactionCollection } from '../db/models/transactions.js';

export const getSummaryService = async (userId, year, month) => {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const transactions = await TransactionCollection.find({
      userId: userId,
      date: { $gte: startDate, $lte: endDate },
    }).lean();

    const expensesByCategory = {};
    const incomesByCategory = {};
    let totalExpenses = 0;
    let totalIncomes = 0;

    transactions.forEach(transaction => {
      const { type, categoryId, amount } = transaction;

      if (type === 'EXPENSE') {
        expensesByCategory[categoryId] = (expensesByCategory[categoryId] || 0) + Math.abs(amount);
        totalExpenses += Math.abs(amount);
      } else if (type === 'INCOME') {
        incomesByCategory[categoryId] = (incomesByCategory[categoryId] || 0) + amount;
        totalIncomes += amount;
      }
    });

    const expensesSummary = Object.entries(expensesByCategory).map(([category, total]) => ({
      category,
      total,
    }));

    const incomesSummary = Object.entries(incomesByCategory).map(([category, total]) => ({
      category,
      total,
    }));

    return {
      expensesByCategory: expensesSummary,
      incomesByCategory: incomesSummary,
      totalExpenses,
      totalIncomes,
    };
  } catch (error) {
    throw new Error('Error fetching summary data: ' + error.message);
  }
};
