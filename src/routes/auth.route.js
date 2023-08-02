
const express = require('express');
console.log('auth.route.js:','Hello from route')

//controllers
const authController = require('../controllers/auth.controller')

//middlewares
const validationMiddleware =require('../middlewares/validations.middleware')
const userMiddleware = require('../middlewares/user.middleware')


//Routes
const router = express.Router();
 
router.post('/signup',validationMiddleware.createUserValidation ,authController.signUp);

router.post('/signin', validationMiddleware.loginUserValidaton, authController.signIn);

 router.patch('/password/:id',validationMiddleware.updatePasswordValidation,userMiddleware.validUser,authController.updatePassword)

module.exports = router;