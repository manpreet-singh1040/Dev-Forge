const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Container=require('../models/container');
const uuid=require('uuid');
router.get('/', async(req, res) => {
   try{
    const userId=uuid.v4();
    const user=new Container({
        userId,containerIds:[]
    });
    await user.save();
    let find=await Container.findOne({userId});
    console.log(`User created with userId ${find}`);
    res.status(200).json({message:`User created with userId ${userId}`});
   }
   catch(err){
       res.status(500).send(err);
   }
});


module.exports=router;