const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rol = new Schema({
  name: { type: String, unique:true, required:true}
});

module.exports = mongoose.model('Role', rol);