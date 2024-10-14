import { body, query } from 'express-validator';
export const createMusicValidator = () => [
  body('mname')
    .isString()
    .withMessage('Music is required!')
    .isLength({ max: 30, min: 2 }),
  body('desc')
    .isString()
    .withMessage('Atleast say something!')
    .isLength({ max: 100 }),
  body('genere').isString('select your genere'),
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
  body('genere').isString('select your genere'),
];
