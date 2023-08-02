
const AppError =require('./../utils/appError')
const handleCastError22001 = () =>{
    return new AppError('The number of charecters is grater than expected',400)
}

const sendErrorDev = (err, res) => {
    console.log(err);
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err: err,
    });
}

const sendErrorProd = (err, res) => {
    console.log(err)
    if (err.isOperational) {
        // operacional, trusted error : send message to the client
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })

    } else {
        // programming or other unknown: don´t leak error detail
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
        })

    }

}
const globalErrorHandler = (err, req, res, next) => {
    //solo entran errores 400, de lo contrario se coloca 500
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    if (process.env.NODE_ENV === 'production') {
        // manejo errores en produccción
        let error = err;
        if (err.parent?.code === '22001') error = handleCastError22001();

        sendErrorProd(error, res);

    }

};

module.exports = globalErrorHandler;