const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateJWT = require('./../utils/jwt.js');
const AppError = require('../utils/appError');

//signup
exports.signUp = catchAsync(async (req, res, next) => {
    //console.log('auth.controller.js. signUp')

    const { name, email, password, description } = req.body;

    //salt numero de encriptaciones. 10 por defcto
    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        password: encryptedPassword,
        description,
    });
    //Nota: ni password ni otra información sensible deben devolverse al cliente!

    //generación del token
    const token = await generateJWT(user.id);

    res.status(200).json({
        status: 'success',
        message: 'The user has been created',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            description: user.description,
            profileImgUrl: user.profileImgUrl,
        },
    });
});

//signin

exports.signIn = catchAsync(async (req, res, next) => {
    //1. Traer informacion de rer.body
    const { email, password } = req.body;

    //2. buscar el usuario y revisar si existe
    const user = await User.findOne({
        where: {
            email: email.toLowerCase().trim(),
            status: 'active',
        },
    });

    if (!user) {
        return next(new AppError(`User with email: ${email} not found`, 404));
    }

    //3. validar si la contraseña es correcta

    if (!(await bcrypt.compare(password, user.password))) {
        return next(new AppError(`Incorrect email or password`, 401));
    }

    //4- generar el token
    const token = await generateJWT(user.id);

    res.status(200).json({
        status: 'success',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            description: user.description,
            profileImgUrl: user.profileImgUrl,
        },
    });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    //1. Trar el usuario que viene de la req, del middleware
    const { user } = req;

    //2. traer los datos de la req.body
    const { currentPassword, newPassword } = req.body;

    //3. validar si la contraseña actual y nueva son iguales, enviar un error
    if (currentPassword === newPassword) {
        return next(new AppError('The passwords cannot be equal',400));
    }
    //4. validar si la contraseña actual es igual a la contraseña en db
    if (!(await bcrypt.compare(currentPassword, user.password))) {
        return next(new AppError('Incorrect password', 401));
    }

    //5. encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);

    //6. Actualizar el usuario que viene de la request
    await user.update({
        password: encryptedPassword,
        passwordChangedAt: new Date()
    });
     
    //7. enviar el mesaje al cliente
    return res.status(200).json({
        status: 'success',
        message: 'The user password was updated successfully',
    })
});
