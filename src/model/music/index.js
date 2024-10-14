import mongoose from 'mongoose';
import musicSchema from './Schema.js';
import { modelNames } from '../../utils/constants.js';
import * as methodFunction from './methods.js';
musicSchema.method(methodFunction);
const Muisc = mongoose.model(modelNames.music, musicSchema);
export default Muisc;
