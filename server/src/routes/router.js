const express=require('express');
const router=express.Router();

const newUserRouter=require('./newUser');
const buildRouter=require('./build');



router.use('/build', buildRouter);
router.use('/newUser',newUserRouter);

module.exports=router;