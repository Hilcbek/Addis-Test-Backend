import asyncHandler from 'express-async-handler';
import { ErrorMessage } from '../error/error.js';
import Song from '../model/song.model.js';
export const createSong = asyncHandler(async (req, res, next) => {
  try {
    let { mname, desc, genere } = req.body;
    if (!mname || !desc || !genere)
      return next(ErrorMessage(400, 'all fields are required!'));
    let Mname = await Song.findOne({ mname });
    if (Mname) return next(ErrorMessage(401, 'Sogn already exist!'));
    let song = await Song.create(req.body);
    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
});
export const allSongs = asyncHandler(async (req, res, next) => {
  try {
    let allSongs = await Song.find({}).sort({ createdAt: -1 });
    res.status(200).json(allSongs);
  } catch (error) {
    next(error);
  }
});
export const updateSong = asyncHandler(async (req, res, next) => {
  try {
    let id = req.params.id;
    if (!id)
      return next(ErrorMessage(404, 'Music identifier is not provided!'));
    let song = await Song.findOne({ _id: id });
    console.log(req.body);
    if (!song) return next(ErrorMessage(404, "can't perform is action!"));
    let response = await Song.findByIdAndUpdate(
      id,
      {
        $set: {
          ...req.body,
          mname: req.body.mname || song.mname,
          desc: req.body.desc || song.desc,
          genere: req.body.genere || song.genere,
        },
      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
export const deleteSong = asyncHandler(async (req, res, next) => {
  try {
    let id = req.params.id;
    if (!id)
      return next(ErrorMessage(404, 'music identifier is not provided!'));
    let song = await Song.findOne({ _id: id });
    if (!song) return next(ErrorMessage(404, "can't perform is action!"));
    await Song.findByIdAndDelete(id);
    res.status(200).json(id);
  } catch (error) {
    next(error);
  }
});
