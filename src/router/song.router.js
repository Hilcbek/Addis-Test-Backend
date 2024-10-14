import express from 'express';
import {
  allMusics,
  createMusic,
  deleteMusic,
  updateMusic,
} from '../controller/song.controller.js';
import { createMusicValidator } from '../validators/music.validator.js';
import parser from '../validators/errors.paraser.js';
export const musicRouter = express.Router();
musicRouter.get('/', allMusics);
musicRouter.post('/', createMusicValidator(), parser, createMusic);
musicRouter.put('/:id', updateMusic);
musicRouter.delete('/:id', deleteMusic);
