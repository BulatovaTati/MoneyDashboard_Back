import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const categoriesPath = path.resolve(__dirname, '../../categoriesList.json');

const getCategoriesService = async () => {
  const data = await readFile(categoriesPath, 'utf8');
  return JSON.parse(data);
};

export default getCategoriesService;
