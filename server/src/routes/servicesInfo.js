const express = require('express');
const router = express.Router();
const UserContainer = require('../models/usercontainer');
const Container = require('../models/container');
const {exec} = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const getLogs=async(containerId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const {stdout,stderr}=await execPromise(`docker logs ${containerId}`);
            resolve(stdout);
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}





router.get('/',async(req, res) =>{
    try{
        let serviceNo=req.body.params.id;
        //console.log(req.body.params);
        let data=await UserContainer.findOne({userId:req.body.userId});
        console.log(data);
        let containerId=data.containerIds[serviceNo-1];
        let container = await Container.findOne({ containerId });
        let logs=await getLogs(container.containerId);
            let temp = {
                containerType: container.containerType,
                containerImage: container.containerImage,
                gitUrl: container.gitUrl,
                repo: container.repo,
                buildCommand: container.buildCommand,
                runCommand: container.runCommand,
                subDomain: container.subDomain,
                directory: container.directory,
                logs:logs
            }
            //services.push(temp);
        res.json({ status:true,service:temp });        
    }
    catch(err){
        console.log(err);
        res.status(500).json({ status:false,message: 'Internal server error' });
    }
    //res.json({ status: true });
});

module.exports = router;

