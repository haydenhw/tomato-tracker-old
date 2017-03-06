const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    function: String,
    height: Number,
    width: Number
});

const Modules = mongoose.model('Modules', moduleSchema);

module.exports = {Modules};