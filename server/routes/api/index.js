import express from 'express';
import usersRoute from './users';
import booksRoute from './books';

const router = express.Router();
router.use('/', usersRoute);
router.use('/', booksRoute);

export default router;
