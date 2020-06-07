const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  recordedTime: { type: Number, required: true },
  shortId: { type: String, required: true },
  log: [{
    startTime: String,
    endTime: String,
  }],
}, { timestamps: { createdAt: 'createdAt' } });

const projectSchema = mongoose.Schema({
  projectName: { type: String, required: true },
  position: Number,
  shortId: { type: String, required: true },
  tasks: [taskSchema],
}, { timestamps: { createdAt: 'createdAt' } });

const logSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  recordedTime: { type: Number, required: true },
  parentProjectName: { type: String, required: true },
});

const featureRequestSchema = mongoose.Schema({
  featureRequests: {
    type: String, required: true,
  },
});


const FeatureRequests = mongoose.model('featureRequests', featureRequestSchema);
const Logs = mongoose.model('Logs', logSchema);
const Projects = mongoose.model('Projects', projectSchema);

module.exports = { FeatureRequests, Projects, Logs };
