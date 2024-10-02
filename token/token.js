import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { ErrorMessage } from '../error/error.js';
import User from '../model/user.model.js';
export const isLoggedInUser = asyncHandler(async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) return next(ErrorMessage(401, 'Login first!'));
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) return next(ErrorMessage(500, 'Authentication failed!'));
      let isUserExist = await User.findOne({ _id: user?.id });
      if (!isUserExist) return next(ErrorMessage(404, 'User not found!'));
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
});
