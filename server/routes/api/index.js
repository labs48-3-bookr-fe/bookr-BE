import express from 'express';
import usersRoute from './users';
import booksRoute from './books';
import reviewsRoute from './reviews';
import ratingsRoute from './ratings';

const router = express.Router();
router.use('/', usersRoute);
router.use('/', booksRoute);
router.use('/', reviewsRoute);
router.use('/', ratingsRoute);

export default router;
