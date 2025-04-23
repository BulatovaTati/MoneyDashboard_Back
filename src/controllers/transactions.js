import { TransactionCollection } from '../db/models/transactions.js';
import {
  createTransactionService,
  getAllTransactionsService,
  deleteTransactionService,
  updateTransactionService,
} from '../services/transactions.js';

export const createTransaction = async (req, res) => {
  try {
    const { userId } = req;
    const { comment, type, categoryId, amount, transactionDate } = req.body;

    const newTransaction = await createTransactionService({
      userId,
      comment,
      type,
      categoryId,
      amount,
      transactionDate,
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating transaction', error: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const transactions = await getAllTransactionsService(userId);
    res.status(200).json({ data: transactions });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching transactions', error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const updateData = req.body;

    const updatedTransaction = await updateTransactionService(
      id,
      userId,
      updateData,
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        message:
          'Transaction not found or you do not have permission to update it',
      });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating transaction', error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const transaction = await TransactionCollection.findOne({
      _id: id,
      userId: userId,
    });

    if (!transaction) {
      return res.status(404).json({
        message:
          'Transaction not found or you do not have permission to delete it',
      });
    }

    await deleteTransactionService(id, userId, transaction);

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting transaction', error: error.message });
  }
};
