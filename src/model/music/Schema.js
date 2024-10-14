import mongoose from 'mongoose';
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
  },
});
export default musicSchema;
