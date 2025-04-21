import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const categoriesPath = path.resolve(__dirname, '../../categoriesList.json');

const getCategoriesService = async (type) => {
  if (type === 'income') {
    return ['Incomes'];
  }

  if (type === 'expense') {
    const data = await readFile(categoriesPath, 'utf8');
    return JSON.parse(data);
  }

  throw new Error('Invalid category type. Use ?type=income or ?type=expense');
};

export default getCategoriesService;
