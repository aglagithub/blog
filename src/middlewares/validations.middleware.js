const { body, validationResult } = require('express-validator')

const validFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.mapped(),
        })
    }
    next();
}

exports.updateUserValidation = [
    body('name').notEmpty().withMessage('Name is Required'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10, max: 50 })
        .withMessage('Description must be at least 10 characters long and max 50'),
    validFields,
]

exports.createUserValidation = [
    body('name')
    .notEmpty().withMessage('Name is required'),
    body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be a correct format'),
    body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-zA-Z]/).withMessage('Password must have at least one letter'),
    body('description')
    .notEmpty()
    .withMessage('Description is required'),
    validFields,
]

exports.loginUserValidaton = [
    body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be a correct format'),
    body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[a-zA-Z]/).withMessage('Password must have at least one letter'),
    validFields,

]

exports.updatePasswordValidation = [
    body('currentPassword')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[a-zA-Z]/).withMessage('Password must have at least one letter'),
    body('newPassword')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/[a-zA-Z]/).withMessage('Password must have at least one letter'),
    validFields,
]

  