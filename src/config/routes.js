import express from 'express';
import { musicRouter } from '../router/song.router.js';
const router = express.Router();
export default router.use('/music', musicRouter);
