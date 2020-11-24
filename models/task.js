const mongoose = require('mongoose')
const { Schema } = mongoose

const TaskSchema = new Schema({
  title: { type: String, required: true, trim: true, maxlength: 255 },
  isDone: { type: Boolean, default: false }
})

module.exports = mongoose.model('task', TaskSchema)
