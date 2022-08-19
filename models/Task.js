const mongoose = require('mongoose');
const date = require('dayjs');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: { type: Boolean, default: false, required: true },
    date: { type: Number, default: date().format('DDMMYY'), required: true}
}, {collection: 'tasks'});

module.exports = mongoose.model('Task', taskSchema)