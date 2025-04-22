import { createTransactionService, getAllTransactionsService, deleteTransactionService, updateTransactionService } from '../services/transactions.js';

export const createTransaction = async (req, res) => {
  try {
    const { userId } = req;
    const { comment, type, category, value } = req.body;

    const newTransaction = await createTransactionService({
      userId,
      comment,
      type,
      category,
      value,
      date: new Date(),
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const { userId } = req;
    console.log('userId from req:', userId);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const transactions = await getAllTransactionsService(userId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const updateData = req.body;

    const updatedTransaction = await updateTransactionService(id, userId, updateData);

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found or you do not have permission to update it' });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction', error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const deletedTransaction = await deleteTransactionService(id, userId);

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found or you do not have permission to delete it' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
};
