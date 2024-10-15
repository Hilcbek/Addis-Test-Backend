import asyncHandler from 'express-async-handler';
import { ErrorMessage } from '../error/error.js';
import Music from '../model/music/index.js';
export const createMusic = asyncHandler(async (req, res, next) => {
  try {
    let { mname, desc, genere } = req.body;
    const newMusic = new Music({
      mname: mname,
      desc: desc,
      genere: genere,
    });
    try {
      const addedUser = await newMusic.createMusic();
      res.json(addedUser);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});
export const allMusics = asyncHandler(async (req, res, next) => {
  try {
    let { search } = req.query;
    let all = new Music();
    const response = await all.fetchAllMusic(search);
    res.json(response);
  } catch (error) {
    next(error);
  }
});
export const updateMusic = asyncHandler(async (req, res, next) => {
  try {
    let id = req.params.id;
    if (!id)
      return next(ErrorMessage(404, 'Music identifier is not provided!'));
    const music = new Music();
    const response = await music.updateMusic(id, req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});
export const deleteMusic = asyncHandler(async (req, res, next) => {
  try {
    let id = req.params.id;
    if (!id)
      return next(ErrorMessage(404, 'music identifier is not provided!'));
    const music = new Music();
    const response = await music.deleteMusic(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});
