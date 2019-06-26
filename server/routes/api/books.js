import express from 'express';
import BookController from '../../controller/BookController';
import postBookValidation from '../../middleware/validations/postBook';
import Authenticate from '../../middleware/auth/Authenticate';

const router = express.Router();
const { verifyToken } = Authenticate;
const { addBook } = BookController;

router.post('/books', verifyToken, postBookValidation, addBook);

export default router;
