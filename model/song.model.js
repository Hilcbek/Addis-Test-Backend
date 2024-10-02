import mongoose from 'mongoose';
let { model, Schema } = mongoose;
const songSchema = new Schema({
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
  },
});
export default model('Song', songSchema);
