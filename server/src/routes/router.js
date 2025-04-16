const express=require('express');
const router=express.Router();

const newUserRouter=require('./newUser');
const buildRouter=require('./build');
const loginRouter=require('./login');
const signinRouter=require('./signin');
const loginAuth=require('../middlewares/auth');
const githubAuth=require('../middlewares/githubAuth');
const userServicesRouter=require('./userServices');
const servicesInfoRouter=require('./servicesInfo');
const logsRouter=require('./logs'); 
const deleteService=require('./deleteService');
// const { use } = require('passport');
const redeployRouter=require('./redploy');

router.use('/redeploy/:id',loginAuth,redeployRouter);
router.use('/build', loginAuth,buildRouter);
//router.use('/build',buildRouter);
//router.use('/newUser',newUserRouter);
router.use('/login',loginRouter);
router.use('/signin',signinRouter);
//router.get('/services/:id',(req,res)=>{console.log(req.params);res.json({status:true})});
router.use('/services/:id',loginAuth,servicesInfoRouter);
router.use('/services',loginAuth,userServicesRouter);
router.use('/logs/:id',loginAuth,logsRouter);
router.use('/deleteService/:id',loginAuth,deleteService);
router.get('/checkLogin',loginAuth,(req,res)=>{
    res.json({status:true});
})
router.get('/hey',githubAuth,(req,res)=>{
    res.json({status:true});
})
module.exports=router;