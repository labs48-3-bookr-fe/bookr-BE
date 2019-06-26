import express from 'express';
import UserController from '../../controller/UserController';
import signUpValidation from '../../middleware/validations/signUp';
import signInValidation from '../../middleware/validations/signIn';

const router = express.Router();
const { signUp, signIn } = UserController;

router.post('/users', signUpValidation, signUp);
router.post('/users/login', signInValidation, signIn);

export default router;
