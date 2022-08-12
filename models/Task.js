const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: String,
    completed: { type: Boolean, default: false },
    
}, {collection: 'tasks'});

module.exports = mongoose.model('Task', taskSchema)