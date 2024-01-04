import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const tagSchema = new Schema({
    _id: { type: String },
    name: { type: String }
});

export const tagModel = mongoose.model('tags', tagSchema);
