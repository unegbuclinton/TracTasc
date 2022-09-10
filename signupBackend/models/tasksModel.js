const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const newTask = new Schema({
  task: String,
  description: String,
  date: Date,
  status: { type: Boolean, default: false },
  user: { type: mongoose.Types.ObjectId, ref: 'myTable' },
});

module.exports = model('task', newTask);
