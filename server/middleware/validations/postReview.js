const { check, validationResult } = require('express-validator/check');

const ReviewValidator = [
  check('review')
    .isLength({ min: 1 })
    .withMessage('Review must be atleast one character in length')
    .trim(),
  check('bookId')
    .isNumeric()
    .withMessage('Book Id must be a number'),

  function ReviewValidation(req, res, next) {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: errorValidation.array()
      });
    }
    next();
  }
];
export default ReviewValidator;
