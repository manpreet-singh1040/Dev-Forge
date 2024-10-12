const mongoose = require('mongoose');
const githubAuth = require('../middlewares/githubAuth');

const containerSchema=new mongoose.Schema({
    containerId:{
        type: String,
        required: true,
        unique: true
    },
    containerType:{
        type: String,
        required: true
    },
    containerName:{
        type: String,
        required: true
    },
    containerImage:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    buildCommand:{
        type: String,
        required: true
    },
    runCommand:{
        type: String,
        required: true
    },
    repo:{
        type: String,
        required: true
    },
    subDomain:{
        type: String,
        required: true
    },
    directory:{
        type: String,
        required: true
    },
    gitUrl:{
        type: String,
        required: true
    }
});

const Container=mongoose.model('Container', containerSchema);

module.exports=Container;