import { Router } from 'express';

const transactionsRouter = Router();

// GET all /transactions
transactionsRouter.get('/');

// POST /transactions
transactionsRouter.post('/');

// PATCH /transactions/:id
transactionsRouter.patch('/:id');

// DELETE /transactions/:id
transactionsRouter.delete('/:id');

export default transactionsRouter;
