import mongoose from 'mongoose';
const Schema = mongoose.Schema;


export const categorySchema = new Schema({

    _id: { type: String },
    name: { type: String },
});

export const categoryModel = mongoose.model('categories', categorySchema);

