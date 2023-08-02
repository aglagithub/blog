const express = require('express');

const userController = require('./../controllers/user.controller');

//Middlewares
const userMiddleware = require('./../middlewares/user.middleware')
const validationMiddleware = require('./../middlewares/validations.middleware')

const router = express.Router();

router.get('/', userController.findAllUsers);

//router.use('/:id', userMiddleware.validUser)

router.use('/:id', userMiddleware.validUser)
    .route('/:id')
    .get(userController.findOneUser)
    .patch(validationMiddleware.updateUserValidation,userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router; 
