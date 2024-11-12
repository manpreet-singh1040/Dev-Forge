const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const UserContainer = require('../models/usercontainer');
const Container = require('../models/container');
const Docker = require('dockerode');
const docker = new Docker();


const redeployController = async (req, res) => {
    console.log(req.body.params);
    const{ userId,params }=req.body;
    console.log("hey baby!!");
    try{

        let containerId=await UserContainer.findOne({userId:userId});
        containerId=containerId.containerIds[params.id];
        let containerInfo=await Container.findOne({containerId:containerId});
        console.log(containerId);
        const container= docker.getContainer(containerId);
        /// await container.kill();
        await execPromise(`docker exec ${containerId} /bin/sh -c "./killAllProcess.sh"`);
        console.log("killed all process");

        
        // await execPromise(`docker exec ${containerId} /bin/sh -c "rm -r ${containerInfo.repo}"`);
        // console.log("removed all the repo files!!");
        // await execPromise(`docker exec ${containerId} /bin/sh -c "chmod +x shellScript.sh"`);
        execScript(container);
        console.log("redeployed the container");
        res.json({ status: true });
    }
    catch(e){
        console.log(e);
        res.json({ status: false });
    }
};



const execScript=async (container)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let stream=await container.exec({Cmd:['/bin/sh',"-c","./shellScript.sh > /proc/1/fd/1 2>/proc/1/fd/2"],AttachStdout:true,AttachStderr:true});
            let stream1=await stream.start({detach:false,stream:true});
            stream1.on('data',(data)=>{
                //console.log(data.toString());
            });
            stream1.on('end',()=>{
               // resolve();
            });
            stream1.on('error',(err)=>{

                reject(err);

            });
            resolve();
        }catch(err){
            reject(err);
        }
    });
}



module.exports = redeployController;