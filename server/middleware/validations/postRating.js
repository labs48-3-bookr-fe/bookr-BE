const { check, validationResult } = require('express-validator/check');

const RatingValidator = [
  check('rating')
    .isNumeric()
    .withMessage('Rating must be a number'),
  check('bookId')
    .isNumeric()
    .withMessage('Book Id must be a number'),

  function RatingValidation(req, res, next) {
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
export default RatingValidator;
