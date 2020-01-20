import mongoose from 'mongoose';
import PointSchema from './utils/pointSchema';

const DevSchema = new mongoose.Schema({
  nome: String,
  git_user: String,
  biografia: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});


module.exports = mongoose.model('Dev', DevSchema);
