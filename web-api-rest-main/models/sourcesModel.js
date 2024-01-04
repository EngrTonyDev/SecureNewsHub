const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const source = new Schema({
  url: { type: String, required:true },
  name: { type: String, required:true },
  user: {type: Schema.Types.ObjectId, ref:'User'},
  category: {type: Schema.Types.ObjectId, ref:'Category'},

});

module.exports = mongoose.model('Source', source);