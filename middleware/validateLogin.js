const {check, validationResult} = require('express-validator');

const validateLogin = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email required'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array().map(err => err.msg).join(' | ');
      return res.status(400).json({ error: message });
    }
    next();
  }
];

module.exports = {validateLogin};