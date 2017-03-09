const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    function: String,
    height: Number,
    width: Number
});

const projectSchema = mongoose.Schema({
    name: String,
    boardSpecs: {
      x: Number,
      y: Number,
      height: Number,
      width: Number
    },
    modules: [{  
      x: Number,
      y: Number,
      name: String
    }]
});

const Modules = mongoose.model('Modules', moduleSchema);
const Projects = mongoose.model('Projects', projectSchema);

module.exports = {Modules , Projects};
/*
{
"name": "Test Project",
"boardSpecs": {
  "x": 50,
  "y": 50,
  "height": 300,
  "width": 500
},
"moudles": []
}*/