const Docker = require('dockerode');
const docker = new Docker();
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const staticSiteDeployment = async (req, res) => {
    console.log(req.body.params);
    const{ userId,params }=req.body;
    console.log("hey baby!!");
};


module.exports = staticSiteDeployment;