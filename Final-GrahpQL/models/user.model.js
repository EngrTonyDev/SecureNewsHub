import mongoose from 'mongoose';
const Schema = mongoose.Schema;


export const userSchema = new Schema({

  _id: { type: String },
  email: { type: String }
});

export const userModel = mongoose.model('user', userSchema);

