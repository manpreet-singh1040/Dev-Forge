const Docker=require('dockerode');
const uuid=require('uuid');
const mongoose=require('mongoose');
const {exec}=require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const createShellScript = require('../services/createShellScript');
const createContainer=require('../services/createContainer');
const confNginx=require('../services/confNginx');
const createStaticCon=require('../services/createStaticCon');
const confStaticNginx=require('../services/confStaticNginx');

const docker = new Docker();
const buildController=async (req,res)=>{
    try{
        const rootPath=process.env.ROOT_PATH;
        console.log(rootPath);
        const {environment,userId,gitUrl,repo,buildCommand,runCommand,subDomain,type,directory}=req.body;
        // console.log(type);
        if(type==="webservices")
        {
            // console.log(req.body);
            const containerName=uuid.v4();
            const container=await createContainer("povtemp/devforge-node-service",containerName,gitUrl,repo,subDomain);
            console.log(`constaier created`);
            await insertContainer(container,userId,environment,type,containerName,gitUrl,repo,buildCommand,runCommand,subDomain);
            console.log(`container inserted in user array`);
    
    
            // await confNginx(containerName,subDomain,type,container);
            // console.log(`nginx configured`);
    
    
            await createShellScript(`${container.id}.sh`,buildCommand,runCommand,directory);
            console.log(`shell script created`);
            await execPromise(`docker cp ${rootPath}/server/ShellScripts/${container.id}.sh ${container.id}:/shellScript.sh`);
            console.log(`shell script copied`);
            await execPromise(`rm ${rootPath}/server/ShellScripts/${container.id}.sh`);
            console.log(`shell script deleted`);
            /*await gitClone(gitUrl,container);
            console.log(`git clone done`);
            await installDependencies(container,repo);
            console.log(`installed dependencies :) `);*/
            execScript(container);
            //console.log(`script executed`);
            //await execPromise(`docker exec -d ${container.id} /bin/sh -c /nodeShell.sh`);
            //console.log(`script executed`);
            const UserContainer=require('../models/usercontainer');
            const usercontainer=await UserContainer.findOne({userId});
            let id=usercontainer.containerIds.length-1;
            res.status(200).json({message:`Build done`,id:id});

        }
        else if(type==="website")
        {
            let deploymentId=uuid.v4();
            console.log("hey baby!!");
            console.log(deploymentId);
            const nginxContainer = docker.getContainer('treafik-nginx-1');
            // await execPromise(`cd ${process.env.ROOT_PATH}/server/nginxData/sites-available && mkdir ${deploymentId}`);
            await execPromise(`cd ${process.env.ROOT_PATH}/server/nginxData/staticContent && mkdir ${deploymentId}`);
            console.log(`directories static site created`);
            let image=`staticnode`;
            let staticContainer=await createStaticCon(image,gitUrl,repo,deploymentId);
            console.log(`static container created`);
            // let staticContainer=await createStaticCon();


            await insertContainer(staticContainer,userId,environment,type,deploymentId,gitUrl,repo,buildCommand,runCommand,subDomain);
            console.log(`container inserted in user array`);


            await execPromise(`docker exec -d ${staticContainer.id} /bin/sh -c "./staticDeployment.sh > /proc/1/fd/1 2>/proc/1/fd/2 "`);
            console.log(`static container started`);
            await confStaticNginx(deploymentId,subDomain);
            console.log(`nginx configured`);
            await execPromise(`docker exec ${nginxContainer.id} /bin/sh -c "nginx -s reload"`);
            console.log(`nginx reloaded`);
            res.status(200).json({message:"Static Site is Deploying"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message});
    }
}
module.exports=buildController;


const insertContainer=async (container,userId,environment,type,containerName,gitUrl,repo,buildCommand,runCommand,subDomain)=>{
    return new Promise(async(resolve,reject)=>{

        try{
            const UserContainer=require('../models/usercontainer');
            const Container=require('../models/container');
            const User= await UserContainer.findOne({userId:userId});
            const newContainer=new Container({
                containerId:container.id,
                containerName:containerName,
                containerType:type,
                containerImage:environment,
                userId:userId,
                gitUrl:gitUrl,
                repo:repo,
                buildCommand:buildCommand,
                runCommand:runCommand,
                subDomain:subDomain,
                directory:repo
            });
            //console.log(`${container.id} ${containerName} ${type} ${environment} ${userId}`);
            await newContainer.save();
            if(User){
                User.containerIds.push(container.id);
                await User.save();
                console.log(`container inserted in user array in function`);
                resolve(true);
            }
            else{
                console.log(`User not found`);
                reject(false);
            }
        }catch(err){
            console.log(err);
            reject(false);
        }
    })
}

/*const gitClone=async (url,container)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const gitCommand=`git clone ${url}`;
            const P1=await container.exec({Cmd:['/bin/sh',`-c`,gitCommand],AttachStdout:true,AttachStderr:true});
            const P1stream=await P1.start({detach:false,stream:true});
            console.log("Git clone started");
            P1stream.on('data',(data)=>{})
            P1stream.on('error',(err)=>{
                console.log(`error in git clone ${err}`);
                reject(err);
            })
            P1stream.on('end',()=>{
                //console.log("Git clone done");
                resolve(true);
            })
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}*/

/*const installDependencies=async (container,repo)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const installCommand=`cd ${repo} && npm install`;
            const P1=await container.exec({Cmd:['/bin/sh',`-c`,installCommand],AttachStdout:true,AttachStderr:true});
            const P1stream=await P1.start({detach:false,stream:true});
            resolve(true);
            P1stream.on('data',(data)=>{});
            P1stream.on('error',(err)=>{
                reject(err);
            })
            P1stream.on('end',()=>{
                console.log("Dependencies installed");
            })
        }catch(err){
            reject(err);
        }
    });
}*/


const execScript=async (container)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const runningCommand=`chmod +x /shellScript.sh`;
            const P1=await container.exec({Cmd:['/bin/sh',runningCommand],AttachStdout:true,AttachStderr:true});
            const P1stream=await P1.start({detach:false,stream:true});
            P1stream.on('data',(data)=>{});
            P1stream.on('error',(err)=>{
                reject(err);
            })
            P1stream.on('end',async()=>{
                console.log("Script converted to executuable form");
                const P2=await container.exec({Cmd:['/bin/sh','-c','./shellScript.sh > /proc/1/fd/1 2>/proc/1/fd/2'],AttachStdout:true,AttachStderr:true});
                const P2stream=await P2.start({detach:false,stream:true});
                P2stream.on('data',(data)=>{
                });
                P2stream.on('error',(err)=>{
                    reject(err);
                })
                P2stream.on('end',()=>{
                    console.log("Script executed");
                    //resolve(true);
                })
               resolve(true);

            })
        }catch(err){
            reject(err);
        }
    });
}