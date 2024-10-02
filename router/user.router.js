import express from 'express';
import {
  getLoggedInUser,
  Login,
  Logout,
  Register,
} from '../controller/user.controller.js';
import { isLoggedInUser } from '../token/token.js';
export const userRouter = express.Router();
userRouter.post('/register', Register);
userRouter.post('/login', Login);
userRouter.post('/logout', Logout);
userRouter.get('/getLoggedInUser', isLoggedInUser, getLoggedInUser);
