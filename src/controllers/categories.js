import getCategoriesService from '../services/categories.js';
import createHttpError from 'http-errors';

export const getCategories = async (req, res, next) => {
  const categories = await getCategoriesService();

  if (!categories || categories.length === 0) {
    throw createHttpError(404, 'No categories found');
  }

  res.status(200).json({
    status: 200,
    message: 'Categories retrieved',
    data: categories,
  });
};
