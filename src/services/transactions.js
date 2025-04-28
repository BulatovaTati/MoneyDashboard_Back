import { TransactionCollection } from '../db/models/transactions.js';
import { UsersCollection } from '../db/models/user.js';

export const createTransactionService = async (transactionData) => {
  try {
    const user = await UsersCollection.findById(transactionData.userId);
    if (!user) throw new Error('User not found');

    const updatedBalance =
      transactionData.type === 'INCOME'
        ? user.balance + transactionData.amount
        : user.balance - transactionData.amount;

    const newTransaction = new TransactionCollection({
      ...transactionData,
      balanceAfter: updatedBalance,
    });

    await newTransaction.save();

    user.balance = updatedBalance;
    await user.save();

    return newTransaction;
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

export const updateTransactionService = async (
  transactionId,
  userId,
  updateData,
) => {
  try {
    const oldTransaction = await TransactionCollection.findOne({
      _id: transactionId,
      userId,
    });

    if (!oldTransaction) return null;

    const oldAmount = oldTransaction.amount;
    const oldType = oldTransaction.type;

    const newAmount = updateData.amount ?? oldAmount;
    const newType = updateData.type ?? oldType;

    let balanceDiff = 0;

    if (oldType === 'INCOME') balanceDiff -= oldAmount;
    else if (oldType === 'EXPENSE') balanceDiff += oldAmount;

    if (newType === 'INCOME') balanceDiff += newAmount;
    else if (newType === 'EXPENSE') balanceDiff -= newAmount;

    const user = await UsersCollection.findById(userId);
    if (!user) return null;

    user.balance += balanceDiff;
    await user.save();

    const updatedTransaction = await TransactionCollection.findOneAndUpdate(
      { _id: transactionId, userId },
      {
        $set: {
          ...updateData,
          balanceAfter: user.balance,
        },
      },
      { new: true },
    );

    return updatedTransaction;
  } catch (error) {
    throw new Error('Error updating transaction: ' + error.message);
  }
};

export const deleteTransactionService = async (
  transactionId,
  userId,
  transaction,
) => {
  try {
    const deletedTransaction = await TransactionCollection.findOneAndDelete({
      _id: transactionId,
      userId: userId,
    });

    if (!deletedTransaction) return null;

    const user = await UsersCollection.findById(userId);
    if (!user) return null;

    if (transaction.type === 'INCOME') {
      user.balance -= transaction.amount;
    } else if (transaction.type === 'EXPENSE') {
      user.balance += transaction.amount;
    }

    await user.save();

    return deletedTransaction;
  } catch (error) {
    throw new Error('Error deleting transaction: ' + error.message);
  }
};
