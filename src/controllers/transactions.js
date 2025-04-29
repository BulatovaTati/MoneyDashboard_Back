import { TransactionCollection } from '../db/models/transactions.js';
import { UsersCollection } from '../db/models/user.js';
import {
  createTransactionService,
  getAllTransactionsService,
  deleteTransactionService,
  updateTransactionService,
} from '../services/transactions.js';

export const createTransaction = async (req, res) => {
  const userId = req.user?._id;
  const { comment, type, categoryId, amount, date } = req.body;

  const newTransaction = await createTransactionService({
    userId,
    comment,
    type,
    categoryId,
    amount,
    date,
  });

  res.status(201).json(newTransaction);
};

export const getAllTransactions = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const transactions = await getAllTransactionsService(userId);
  res.status(200).json({ data: transactions });
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;
  const updateData = req.body;

  const updatedTransaction = await updateTransactionService(
    id,
    userId,
    updateData,
  );

  if (!updatedTransaction) {
    res.status(404);
    throw new Error(
      'Transaction not found or you do not have permission to update it',
    );
  }

  res.status(200).json(updatedTransaction);
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const transaction = await TransactionCollection.findOne({
    _id: id,
    userId,
  });

  if (!transaction) {
    res.status(404);
    throw new Error(
      'Transaction not found or you do not have permission to delete it',
    );
  }

  await deleteTransactionService(id, userId, transaction);

  const user = await UsersCollection.findById(userId);

  res.status(200).json({
    id: transaction._id,
    balanceAfter: user.balance,
  });
};
