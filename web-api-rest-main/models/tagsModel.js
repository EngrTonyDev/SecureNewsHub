const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tag = new Schema({
    name: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('Tag', tag);