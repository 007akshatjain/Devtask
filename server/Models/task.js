const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, enum: ['to-do', 'in-progress', 'done'], default: 'to-do' },
    board: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model("Task", taskSchema);