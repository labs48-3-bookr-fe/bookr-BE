import express from 'express';
import ReviewController from '../../controller/ReviewController';
import reviewValidation from '../../middleware/validations/postReview';
import Authenticate from '../../middleware/auth/Authenticate';

const router = express.Router();
const { verifyToken } = Authenticate;
const {
  addReview, deleteReview
} = ReviewController;

router.post('/reviews', verifyToken, reviewValidation, addReview);
router.delete('/reviews/:reviewId', verifyToken, deleteReview);

export default router;
