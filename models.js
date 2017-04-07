const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
  testData: String
});


const TestData = mongoose.model('Modules', moduleSchema);
//const Projects = mongoose.model('Projects', projectSchema);

module.exports = {TestData /*, Projects*/};
