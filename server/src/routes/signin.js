const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const User = require('../models/user');
const UserContainer = require('../models/usercontainer');
router.post('/', async (req, res) => {

    try {
        const { email, password ,userName} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const userId = uuid.v4();
        const user = new User({ email, password: hashedPassword,userName,userId});
        await user.save();
        const newUserContainer = new UserContainer({userId,containerIds:[]});
        await newUserContainer.save();
        res.status(200).json({ message: 'User created' ,sign:true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;