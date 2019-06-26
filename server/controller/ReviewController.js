import models from '../models';

const { Book, Review } = models;

/**
 * A class that handles all review operations
 */
class ReviewController {
  /**
   * Creates a new review
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async addReview(req, res, next) {
    try {
      const { review, bookId } = req.body;
      const book = await Book.findByPk(bookId).catch(next);
      if (!book) {
        return res.status(404).json({
          status: 404,
          message: 'This book does not exist'
        });
      }

      const newReview = {
        review,
        userId: req.user.userId,
        bookId
      };
      const createdReview = await book.createReview(newReview).catch(next);

      if (createdReview) {
        return res.status(201).json({
          status: res.statusCode,
          review: createdReview
        });
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   * Deletes a review
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async deleteReview(req, res, next) {
    try {
      const review = await Review.findByPk(req.params.reviewId);
      if (!review) {
        return res.status(404).json({
          status: 404,
          message: 'This review does not exist'
        });
      }
      if (review.userId !== req.user.userId) {
        return res.status(401).json({
          status: 401,
          message: 'This user is not authorized to delete this message'
        });
      }

      const deletedReview = await review.destroy().catch(next);
      if (!deletedReview.length) {
        return res.status(200).json({
          status: 200,
          message: 'This review was successfully deleted'
        });
      }
    } catch (e) {
      next(e);
    }
  }
}

export default ReviewController;
