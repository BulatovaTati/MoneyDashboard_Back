import getCategoriesService from '../services/categories.js';

export const getCategories = async (req, res, next) => {
  try {
    const { type } = req.query;

    const categories = await getCategoriesService(type);
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
