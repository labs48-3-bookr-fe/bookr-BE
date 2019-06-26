const { check, validationResult } = require('express-validator/check');

const postBookValidator = [
  check('title')
    .isLength({ min: 3 })
    .withMessage('Book title must be atleast 3 characters in length')
    .trim(),
  check('author')
    .isString()
    .withMessage('Author\'s name must contain just letters')
    .isLength({ min: 3 })
    .withMessage('Author\'s name must be atleast 3 characters in length')
    .trim(),
  check('publisher')
    .isString()
    .withMessage('Enter a valid publisher name')
    .trim(),
  check('image')
    .trim()
    .isString()
    .withMessage('Enter a valid image format'),

  function BookValidation(req, res, next) {
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
export default postBookValidator;
