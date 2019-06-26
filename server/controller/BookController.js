import models from '../models';

const { Book, Review, Rating } = models;

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

  /**
   * Gets all books
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async getBooks(req, res, next) {
    try {
      const books = await Book.findAll({
        include: [
          { model: Review, as: 'reviews' },
          { model: Rating, as: 'ratings' }
        ]
      });
      if (!books.length) {
        return res.status(200).json({
          status: 200,
          message: 'No books available now'
        });
      }

      return res.status(200).json({
        status: 200,
        books
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Gets single book
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async getBook(req, res, next) {
    try {
      const book = await Book.findByPk(req.params.bookId, {
        include: [
          { model: Review, as: 'reviews' },
          { model: Rating, as: 'ratings' }
        ]
      });
      if (!book) {
        return res.status(404).json({
          status: 404,
          message: 'This book does not exist'
        });
      }

      return res.status(200).json({
        status: 200,
        book
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Deletes a single book
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async deleteBook(req, res, next) {
    try {
      const book = await Book.findByPk(req.params.bookId);
      if (!book) {
        return res.status(404).json({
          status: 404,
          message: 'This book does not exist'
        });
      }

      const deletedBook = await book.destroy().catch(next);
      if (!deletedBook.length) {
        return res.status(200).json({
          status: 200,
          message: 'This book was successfully deleted'
        });
      }
    } catch (e) {
      next(e);
    }
  }
}

export default BookController;
