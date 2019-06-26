import models from '../models';

const { Book, Rating } = models;

/**
 * A class that handles all review operations
 */
class RatingController {
  /**
   * Creates a new rating
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async addRating(req, res, next) {
    try {
      let bookRating;
      const { rating, bookId } = req.body;
      const { userId } = req.user;

      const book = await Book.findByPk(bookId).catch(next);
      if (!book) {
        return res.status(404).json({
          status: 404,
          message: 'This book does not exist'
        });
      }

      const newRating = { rating, userId, bookId };
      const oldRating = await Rating.findOne({
        where: {
          bookId,
          userId: req.user.userId
        }
      });

      if (oldRating) {
        bookRating = await oldRating.update(newRating).catch(next);
      } else {
        bookRating = await book.createRating(newRating).catch(next);
      }

      if (bookRating.dataValues) {
        return res.status(201).json({
          status: res.statusCode,
          rating: bookRating
        });
      }
    } catch (e) {
      next(e);
    }
  }
}

export default RatingController;
