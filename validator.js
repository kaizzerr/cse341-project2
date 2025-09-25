const { body, validationResult } = require('express-validator')

const userValidation = () => {
  return [
    body('username')
      .notEmpty().withMessage('Username is required')
      .isString().withMessage('Username must be a string'),
    body('firstName')
      .notEmpty().withMessage('First name is required')
      .isString().withMessage('First name must be a string'),
    body('lastName')
      .notEmpty().withMessage('Last name is required')
      .isString().withMessage('Last name must be a string'),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email')
  ]
}

const taskValidation = () => {
  return [
    body('userId')
      .notEmpty().withMessage('userId is required')
      .isMongoId().withMessage('userId must be a valid MongoDB ObjectId'),
    body('title')
      .notEmpty().withMessage('Title is required')
      .isString().withMessage('Title must be a string'),
    body('description')
      .optional()
      .isString().withMessage('Description must be a string'),
    body('status')
      .optional()
      .isIn(['pending', 'completed']).withMessage('Status must be pending or completed'),
    body('urgency')
      .optional()
      .isIn(['low', 'medium', 'high']).withMessage('Urgency must be low, medium, or high')
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidation,
  taskValidation,
  validate
}