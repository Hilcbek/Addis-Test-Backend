import asyncHandler from 'express-async-handler';
import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import { ErrorMessage } from '../error/error.js';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const Register = asyncHandler(async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password)
      return next(ErrorMessage(500, 'all fields are required!'));
    if (!validator.isEmail(email))
      return next(ErrorMessage(500, 'invalid email address!'));
    if (!validator.isStrongPassword(password))
      return next(ErrorMessage(500, 'password is too weak!'));
    let Username = await User.findOne({ username: username });
    if (Username) return next(ErrorMessage(400, 'user already exists!'));
    let Email = await User.findOne({ email: email });
    if (Email) return next(ErrorMessage(400, 'email already exists!'));
    let genSalt = await bcryptjs.genSalt(10);
    await User.create({
      ...req.body,
      password: await bcryptjs.hash(password, genSalt),
    });
    res.status(200).json({ msg: 'Success!' });
  } catch (error) {
    next(error);
  }
});
export const Login = asyncHandler(async (req, res, next) => {
  try {
    let { username } = req.body;
    if (!username || !req.body.password)
      return next(ErrorMessage(500, 'all fields are required!'));
    let UserName = await User.find({
      $or: [
        {
          username: username,
        },
        {
          email: username,
        },
      ],
    });
    if (!UserName[0])
      return next(ErrorMessage(404, 'wrong username or email-address'));
    let Password = await bcryptjs.compare(
      req.body.password,
      UserName[0].password
    );
    if (!Password) return next(ErrorMessage(500, 'wrong password'));
    let token = createToken(UserName[0]._id);
    let exp = new Date(Date.now() + 60 * 60 * 1000 * 24);
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: exp,
    });
    let { password, ...Info } = UserName[0]._doc;
    res.status(200).json({ msg: Info });
  } catch (error) {
    next(error);
  }
});
export const Logout = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie('token').status(200).json({ msg: 'Logged out!' });
  } catch (error) {
    next(error);
  }
});
export const getLoggedInUser = asyncHandler(async (req, res, next) => {
  try {
    let loggedUser = await User.findById(req.user?.id).select('-password');
    if (loggedUser) res.status(200).json({ msg: true });
    else res.status(404).json({ msg: false });
  } catch (error) {
    next(error);
  }
});
