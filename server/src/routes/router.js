const express=require('express');
const router=express.Router();

const newUserRouter=require('./newUser');
const buildRouter=require('./build');
const loginRouter=require('./login');
const signinRouter=require('./signin');
const loginAuth=require('../middlewares/auth');


router.use('/build', loginAuth,buildRouter);
//router.use('/newUser',newUserRouter);
router.use('/login',loginRouter);
router.use('/signin',signinRouter);
router.get('/checkLogin',loginAuth,(req,res)=>{
    res.json({status:true});
})

module.exports=router;