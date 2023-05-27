const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('./asyncErrorHandler');

exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
    // console.log(req.headers.authorization)

    if (!req.headers.authorization) {
        return next(new ErrorHandler("Please Login to Access", 401))
    }

    console.log("HelloAgain");
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token)
    const decodedData = jwt.verify(token, "hellothere");
    console.log(decodedData);
    req.user = await User.findById(decodedData.password);
    console.log(req.user)
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
        }
        next();
    }
}