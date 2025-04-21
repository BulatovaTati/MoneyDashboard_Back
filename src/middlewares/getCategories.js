export const validateCategoryType = (req, res, next) => {
  const { type } = req.query;

  if (!['income', 'expense'].includes(type)) {
    return res
      .status(400)
      .json({ error: 'Invalid category type. Use ?type=income or ?type=expense' });
  }

  next();
};

