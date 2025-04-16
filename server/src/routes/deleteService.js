const express = require('express');
const router = express.Router();
const UserContainer = require('../models/usercontainer');
const Container = require('../models/container');
const {exec} = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const Docker=require('dockerode');
const docker=new Docker();
// const buildController = require('../controllers/build.js');

router.post('/', async(req,res)=>{
    try{
        const{userId}=req.body;
        let serviceNo=req.body.params.id;
        let data=await UserContainer.findOne({userId:req.body.userId});
        console.log(data);
        let containerIds=data.containerIds;
        let containerId=containerIds[serviceNo];
        console.log(containerId);
        // let container=docker.getContainer(containerId);
        let containerDetails=await Container.findOne({containerId});
        console.log(containerDetails);
        await Container.deleteOne({containerId});
        await UserContainer.updateOne(
            {userId},
            { $pull :{ containerIds : containerId} }
        )
        if(containerDetails.containerType==="webservices"){
            stopContainer(containerId);
            res.status(200).json({mes:"service delete successfuly !!"});
        }
        if(containerDetails.containerType==="website"){
            stopContainer(containerId);
            removeStaticFiles(containerDetails.containerName);
            res.status(200).json({mes:"service delete successfuly !!"});
        }
    }
    catch(err){
        console.log("in the delecte service router !!");
        console.log(err);
        res.status(500).json({mes:"server error"});
    }
});

module.exports = router;


const stopContainer=async (containerId)=>{
   
        try{
            await execPromise(`docker stop ${containerId}`);
            await execPromise(`docker remove ${containerId}`);
        }
        catch(err){
            console.log("int stop container !!");
            console.log(err);
        }
};



const removeStaticFiles=async(containerName)=>{
        try{
            await execPromise(`rm -r ${process.env.ROOT_PATH}/server/nginxData/staticContent/${containerName}`);
            await execPromise(`rm  ${process.env.ROOT_PATH}/server/nginxData/sites-available/${containerName}.conf`);
            await execPromise(`rm -r ${process.env.ROOT_PATH}/server/nginxData/sites-available/${containerName}`); 
            console.log(`nginx files deleted`);
        }
        catch(err){
            console.log(err);
        }
};