const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notice = new Schema({
  title: { type: String, required:true},
  description: { type: String, max:200},
  permalink: { type: String, required:true },
  date:{type: Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref:'User'},
  source: {type: Schema.Types.ObjectId, ref:'Source'},
  category: {type: Schema.Types.ObjectId, ref:'Category'},
  tags: [ { type: Schema.Types.ObjectId, ref: 'Tag' } ]
});

module.exports = mongoose.model('New', notice);