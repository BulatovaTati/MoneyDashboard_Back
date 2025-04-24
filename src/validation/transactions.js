import Joi from 'joi';

export const addTransactionsSchema = Joi.object({
  comment: Joi.string().allow(''),
  type: Joi.string().valid('INCOME', 'EXPENSE').required(),
  categoryId: Joi.string().required(),
  amount: Joi.number().min(0).required(),
  date: Joi.date(),
});

export const editTransactionsSchema = Joi.object({
  comment: Joi.string(),
  type: Joi.string().valid('INCOME', 'EXPENSE'),
  categoryId: Joi.string(),
  amount: Joi.number().min(0),
  date: Joi.date(),
});
