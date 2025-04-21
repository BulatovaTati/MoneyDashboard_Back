import path from 'node:path';

const ACCESS_TOKEN_EXPIRES_IN = '30h';

// swagger
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
