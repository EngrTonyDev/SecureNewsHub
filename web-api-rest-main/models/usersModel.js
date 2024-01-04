const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String },
  last_name: { type: String },
  address1: { type: String },
  address2: { type: String, require: false },
  country: { type: String },
  city: { type: String },
  number: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  status: { type: String, enum: ['Pending', 'Active'], default: 'Pending' },
  confirmCode: { type: String, unique: true },
  phoneCode: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', User);