import models from '../models';

const { Book } = models;

/**
 * A class that handles all book operations
 */
class BookController {
  /**
   * Creates a new book
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async addBook(req, res, next) {
    // confirm user is an admin

    try {
      const {
        title, author, publisher, image, rating
      } = req.body;

      const book = {
        title,
        author,
        publisher,
        image,
        rating
      };
      const newBook = await Book.create(book).catch(next);

      if (newBook) {
        return res.status(201).json({
          status: res.statusCode,
          book: newBook
        });
      }
    } catch (e) {
      next(e);
    }
  }
}

export default BookController;
