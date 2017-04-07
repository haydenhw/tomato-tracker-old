const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  testData: String
});


const TestData = mongoose.model('Modules', testSchema);
//const Projects = mongoose.model('Projects', projectSchema);

module.exports = {TestData /*, Projects*/};
