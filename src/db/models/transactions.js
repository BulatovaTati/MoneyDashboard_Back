import { model, Schema } from 'mongoose';

const transactionSchema = new Schema(
  {
    comment: {
      type: String,
      default: '',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    type: {
      type: String,
      enum: ['EXPENSE', 'INCOME'],
      default: 'INCOME',
    },
    categoryId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      min: 0,
      required: [true, 'Funds value is required'],
    },
    date: { type: Date, required: true },
    balanceAfter: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const TransactionCollection = model('transaction', transactionSchema);
