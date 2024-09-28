const mongoose = require('mongoose');

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
    }
});

const Container=mongoose.model('Container', containerSchema);

module.exports=Container;