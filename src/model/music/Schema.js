import mongoose from 'mongoose';
import { musicGenere } from '../../utils/constants.js';
let { Schema } = mongoose;
const musicSchema = new Schema({
  mname: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  genere: {
    type: String,
    required: true,
    enum: musicGenere,
  },
});
musicSchema.index({ mname: 1 });
musicSchema.pre('save', async function (next) {
  let { mname, desc, genere } = this;
  next();
});
musicSchema.post('save', async function (next) {});

export default musicSchema;
