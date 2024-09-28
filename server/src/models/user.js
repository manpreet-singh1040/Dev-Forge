const mongoose = require('mongoose');
const { use } = require('../routes/login');

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    userName:{  
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User=mongoose.model('User', userSchema);

module.exports=User;