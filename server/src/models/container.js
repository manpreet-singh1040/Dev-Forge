const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    containerIds:{
        type: [String],
    }
});

const Container = mongoose.model('Container', containerSchema);

module.exports = Container;