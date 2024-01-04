import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { userModel as User }  from './user.model.js';
import { categoryModel  as Category }  from './category.model.js';
import { tagModel as Tags }  from './tags.model.js';

export const newsSchema = new Schema({
    _id: { type: String },
    title: { type: String },
    description: { type: String },
    permanlink: { type: String },
    date: { type: Date },
    category: {
        type: Category.schema,
        require: false
    },
    user: {
        type: User.schema,
        required: false
    },
    tags: [{
        type: Tags.schema,
        required: false
    }]

});

export const newsModel = mongoose.model('news', newsSchema);
