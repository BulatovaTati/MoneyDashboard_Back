import Joi from 'joi';

export const addTransactionsSchema = Joi.object({
  comment: Joi.string().allow(''),
  type: Joi.string().valid('INCOME', 'EXPENSE').required(),
  categoryId: Joi.string().required(),
  amount: Joi.number().min(0).required(),
  transactionDate: Joi.date(),
});

export const editTransactionsSchema = Joi.object({
  comment: Joi.string().required(),
  type: Joi.string().valid('INCOME', 'EXPENSE').required(),
  categoryId: Joi.string().required(),
  amount: Joi.number().min(0).required(),
  transactionDate: Joi.date().required(),
});
