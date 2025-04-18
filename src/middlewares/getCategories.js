import fs from 'fs/promises';
import path from 'path';

const categoriesFilePath = path.join(__dirname, '..', 'categoriesList.json');

export const getCategories = async () => {
  try {
    const data = await fs.readFile(categoriesFilePath, 'utf8');
    const categories = JSON.parse(data);
    return categories;
  } catch (error) {
    console.error('Failed to read categories:', error);
    throw error;
  }
};
