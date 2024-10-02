import mongoose from 'mongoose';
let { model, Schema } = mongoose;
let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 2,
    max: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 16,
  },
});
export default model('User', userSchema);
