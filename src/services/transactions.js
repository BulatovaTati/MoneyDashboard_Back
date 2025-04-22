
import { TransactionCollection } from '../db/models/transactions.js';

export const createTransactionService = async (transactionData) => {
  try {
    const newTransaction = new TransactionCollection({
      ...transactionData,
      date: new Date(),
    });
    return await newTransaction.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllTransactionsService = async (userId) => {
  try {
    return await TransactionCollection.find({ userId }).sort({ date: -1 });
  } catch (error) {
    throw new Error('Error fetching transactions: ' + error.message);
  }
};

export const updateTransactionService = async (transactionId, userId, updateData) => {
  try {
    return await TransactionCollection.findOneAndUpdate(
      { _id: transactionId, userId: userId },
      { $set: updateData },
      { new: true }
    );
  } catch (error) {
    throw new Error('Error updating transaction: ' + error.message);
  }
};

export const deleteTransactionService = async (transactionId, userId) => {
  try {
    return await TransactionCollection.findOneAndDelete({ _id: transactionId, userId: userId });
  } catch (error) {
    throw new Error('Error deleting transaction: ' + error.message);
  }
};
