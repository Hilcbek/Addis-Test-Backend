import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { musicRouter } from './router/song.router.js';
const app = express();
dotenv.config();
app.use(
  cors({
    origin: ['https://addis-music-mu.vercel.app', 'http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));
let PORT = process.env.PORT || 8080;
let MONGOOSE_URL = process.env.MONGOOSE_URL;
mongoose
  .connect(MONGOOSE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port -> ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
mongoose.connection.on('connected', () => {
  console.log(`db is connected!`);
});
mongoose.connection.on('disconnected', () => {
  console.log(`db is disconnected!`);
});
app.use('/api/music', musicRouter);
app.use((err, req, res, next) => {
  let errorMessage = err.message || 'Something went wrong!';
  let errStatus = err.status || 500;
  res.status(errStatus).json(errorMessage);
});
