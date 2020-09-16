const mongoose = require('mongoose');

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

module.exports = { FeatureRequests, Logs };
