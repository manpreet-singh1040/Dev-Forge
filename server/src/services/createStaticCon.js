const docker = require('dockerode');
const Docker = new docker();
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const uuid = require('uuid');
const { create } = require('../models/usercontainer');
const createStaticCon = async (image,gitUrl,repo,deploymentId) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let container=await Docker.createContainer({
                Image:image,
                name:deploymentId,
                Tty:true,
                Cmd:['/bin/sh'],
                Env:[`REDIS_HOST=redis`,`REDIS_PORT=6379`,`REDIS_QUEUE=queue`,`CONTAINER_NAME=${deploymentId}`,`REPO_URL=${gitUrl}`,`REPO_NAME=${repo}`],
                HostConfig:{
                    Binds:[
                        `${process.env.ROOT_PATH}/server/nginxData/sites-available/${deploymentId}:/app/sites-available`,
                        `${process.env.ROOT_PATH}/server/nginxData/staticContent/${deploymentId}:/app/staticContent`
                    ],
                    NetworkMode:`devf`
                }
        
            });
            await container.start();
            resolve(container);
        }
        catch(err)
        {
            console.log(err);
            reject(err);
        }
});};


module.exports = createStaticCon;