import express from 'express';
import usersRoute from './users';

const router = express.Router();
router.use('/', usersRoute);

export default router;
