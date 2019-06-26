import express from 'express';
import RatingController from '../../controller/RatingController';
import ratingValidation from '../../middleware/validations/postRating';
import Authenticate from '../../middleware/auth/Authenticate';

const router = express.Router();
const { verifyToken } = Authenticate;
const { addRating } = RatingController;

router.post('/ratings', verifyToken, ratingValidation, addRating);

export default router;
