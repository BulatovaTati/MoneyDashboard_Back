import getCategoriesService from '../services/categories.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await getCategoriesService();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
