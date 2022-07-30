const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const createError = require('http-errors')

const protect = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401);
    // throw new Error('Not authorized - no token.');
    return next(createError.Unauthorized('Not authorized - no token.'));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-hashPassword');

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized.');
  }
});

module.exports = { protect };