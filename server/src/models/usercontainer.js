const mongoose = require('mongoose');

const userContainerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    containerIds:{
        type: [String],
    }
});

const UserContainer = mongoose.model('UserContainer', userContainerSchema);

module.exports = UserContainer;