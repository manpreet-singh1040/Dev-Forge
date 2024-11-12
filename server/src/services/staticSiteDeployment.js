const Docker = require('dockerode');
const docker = new Docker();
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const createStaticCon = require('./createStaticCon');
const staticSiteDeployment = async (req, res) => {
    try{

        // console.log(req.body.params);
        // const{ userId,params }=req.body;
        console.log("hey baby!!");
        const nginxContainer = docker.getContainer('treafik-nginx-1');
        await execPromise(`mkdir ${process.env.ROOT_PATH}/server/nginxData/sites-available/${userId}`);
        await execPromise(`mkdir ${process.env.ROOT_PATH}/server/nginxData/staticContent/${userId}`);
        let staticContainer=await createStaticCon();
        await execPromise(`docker exec -d ${staticContainer.id} /bin/sh -c "./staticDeployment.sh"`);
        res.status(200).json({message:"Static Site is Deploying"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:err.message});
    }

};


module.exports = staticSiteDeployment;