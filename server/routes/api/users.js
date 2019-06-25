import express from 'express';
import UserController from '../../controller/UserController';
import signUpValidation from '../../middleware/validations/signUp';

const router = express.Router();
const { signUp } = UserController;

router.post('/users', signUpValidation, signUp);

export default router;
