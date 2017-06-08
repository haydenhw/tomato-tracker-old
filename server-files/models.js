const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    taskName: String,
    recordedTime: Number,
    log: [{
      startTime: String,
      endTime: String
    }]
});

const projectSchema = mongoose.Schema({
    projectName: {type: String, required: true},
    position: Number, 
    tasks: [taskSchema]
});

const Projects = mongoose.model('Projects', projectSchema);

module.exports = {Projects};
