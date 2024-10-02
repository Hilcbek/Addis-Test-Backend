import express from 'express';
import {
  allSongs,
  createSong,
  deleteSong,
  updateSong,
} from '../controller/song.controller.js';
import { isLoggedInUser } from '../token/token.js';
export const songRouter = express.Router();
songRouter.get('/', allSongs);
songRouter.post('/', createSong);
songRouter.put('/:id', updateSong);
songRouter.delete('/:id', deleteSong);
