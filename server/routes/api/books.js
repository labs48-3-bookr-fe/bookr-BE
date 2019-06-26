import express from 'express';
import BookController from '../../controller/BookController';
import postBookValidation from '../../middleware/validations/postBook';
import Authenticate from '../../middleware/auth/Authenticate';

const router = express.Router();
const { verifyToken } = Authenticate;
const {
  addBook, getBooks, getBook, deleteBook
} = BookController;

router.post('/books', verifyToken, postBookValidation, addBook);
router.get('/books', verifyToken, getBooks);
router.get('/books/:bookId', verifyToken, getBook);
router.delete('/books/:bookId', verifyToken, deleteBook);

export default router;
