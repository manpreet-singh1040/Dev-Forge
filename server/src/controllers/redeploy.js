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

    let containerId=await UserContainer.findOne({userId:userId});
    containerId=containerId.containerIds[params.id];
    let containerInfo=await Container.findOne({containerId:containerId});
    console.log(containerId);
    const container= docker.getContainer(containerId);
    /// await container.kill();
    await execPromise(`docker exec ${containerId} /bin/sh -c "./killAllProcess.sh"`);
    console.log("killed all process");
    await execPromise(`docker exec ${containerId} /bin/sh -c "rm -r ${containerInfo.repo}"`);
    console.log("removed all the repo files!!");
    execPromise(`docker exec ${containerId} /bin/sh -c " ./shellScript.sh > /proc/1/fd/1 2>/proc/1/fd/2"`);
    console.log("redeployed the container");
    res.json({ status: true });
};

module.exports = redeployController;