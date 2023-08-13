const catchAsync = require('../utils/catchAsync');
const {Post, postStatus} = require('../models/post.model');
const AppError = require('../utils/appError');

exports.validPost = catchAsync(async(req, res, next) => {

// 1. Trae info de la req.params    
const {id} = req.params;

//2. busco el post
const post = await Post.findOne({
    where: {
        status:postStatus.active,
        id,
    },
}); 
  
//3. valido que el post exista

if(!post){
    console.log('No existe', post)
    return next((new AppError(`Post with id: ${id} not found`,404)))
}

// 4. adjunto el post por la request y doy continuidad
  req.post =post;

  next();
}); 