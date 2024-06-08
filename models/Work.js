// models/Work.js
const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
  workName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model('Work', WorkSchema);
