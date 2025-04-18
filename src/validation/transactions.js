import Joi from 'joi';

export const addTransactionsSchema = Joi.object({
  comment: Joi.string().allow(''),
  type: Joi.string().valid('expense', 'income').required(),
  category: Joi.when('type', {
    is: 'expense',
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  value: Joi.number().min(0).required(),
  date: Joi.date().required(),
});

export const editTransactionsSchema = Joi.object({
  comment: Joi.string(),
  type: Joi.string().valid('expense', 'income'),
  category: Joi.when('type', {
    is: 'expense',
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  value: Joi.number().min(0),
  date: Joi.date(),
});
