const express = require('express');
const router = express.Router();
const bcypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email}); 
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' ,status:false});
        }
        if(!bcypt.compareSync(password, user.password)){
            return res.status(401).json({ message: 'Invalid password',status:false });
        }
        const payload = jwt.sign({ userId:user.userId,email }, process.env.JWT_SECRET);
        res.cookie('sessionToken',payload,{
           // httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge: 1000*60*60*24*7,
            path:'/'
        })
        res.json({ status:true,login:true,message: 'Login successful' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);

module.exports = router;