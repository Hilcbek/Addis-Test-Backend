import { body, query } from 'express-validator';
import { musicGenere } from '../utils/constants.js';
export const createMusicValidator = () => [
  body('mname').isString().notEmpty().withMessage('Music name is required!'),
  body('desc').isString().notEmpty().withMessage('Atleast say something!'),
  body('genere').isString().notEmpty().withMessage('select your genere'),
];
export const updateMusicValidator = () => [
  body('mname')
    .isString()
    .withMessage('Music is required!')
    .isLength({ max: 30, min: 2 }),
  body('desc')
    .isString()
    .withMessage('Atleast say something!')
    .isLength({ max: 100 }),
  body('genere').isString().isIn(musicGenere).withMessage('select your genere'),
];
