const User = require('../models/user.model');
const catchAsync =require('../utils/catchAsync')
//const validUser =require('../middlewares/user.middleware')


 
//? Find All Users
exports.findAllUsers = catchAsync(async (req, res,next) => {
  
    const users = await User.findAll({
      where: {
        status: 'active',
      },
    });

    //throw new Error ('Error simulated in find all users')
    res.status(200).json({
      status: 'success',
      users,
    });

});

//? Find One User
exports.findOneUser = catchAsync(async (req, res,next) => {

    const { id } = req.params;
    const { user } = req;

    res.status(200).json({
      status: 'success',
      message: `User with ${id} found`,
      user,
    });
});

//? Update User
exports.updateUser = catchAsync(async (req, res,next) => {

    const { user } = req;
    const { id } = req.params;
    const { name, description } = req.body;
    
    await user.update({ name, description });

    return res.status(200).json({
      status: 'success',
      user,
    });
});

//? Delete User
exports.deleteUser = catchAsync(async (req, res,next) => {
  
    const { id } = req.params;

    const { user } = req;

    await user.update({ status: 'inactive' });

    return res.status(200).json({
      status: 'success',
      message: `User with id=${id} deleted successfully`,
    });
 
});
