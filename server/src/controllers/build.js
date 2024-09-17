const Docker=require('dockerode');
const uuid=require('uuid');
const mongoose=require('mongoose');
const {exec}=require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const createContainer=require('../services/createContainer');
const buildController=async (req,res)=>{
    try{
        const rootPath=process.env.ROOT_PATH;
        console.log(rootPath);
        const {environment,userId,gitUrl,repo}=req.body;
        const containerName=uuid.v4();
        const container=await createContainer("test",containerName,gitUrl,repo);
        console.log(`constaier created`);
        await insertContainer(container,userId);
        console.log(`container inserted in user array`);
        await execPromise(`docker cp ${rootPath}/server/src/services/nodeShell.sh ${container.id}:/`);
        console.log(`shell script copied`);
        /*await gitClone(gitUrl,container);
        console.log(`git clone done`);
        await installDependencies(container,repo);
        console.log(`installed dependencies :) `);*/
        await execScript(container);
        //console.log(`script executed`);
        //await execPromise(`docker exec -d ${container.id} /bin/sh -c /nodeShell.sh`);
        //console.log(`script executed`);
        res.status(200).json({message:`Build done`});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
module.exports=buildController;


const insertContainer=async (container,userId)=>{
    return new Promise(async(resolve,reject)=>{

        try{
            const Container=require('../models/container');
            const User= await Container.findOne({userId:userId});
            if(User){
                User.containerIds.push(container.id);
                await User.save();
                resolve(true);
            }
            else{
                reject(false);
            }
        }catch(err){
            console.log(err);
            reject(false);
        }
    })
}

const gitClone=async (url,container)=>{
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
}

const installDependencies=async (container,repo)=>{
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
}


const execScript=async (container)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const runningCommand=`chmod +x /nodeShell.sh`;
            const P1=await container.exec({Cmd:['/bin/sh',runningCommand],AttachStdout:true,AttachStderr:true});
            const P1stream=await P1.start({detach:false,stream:true});
            P1stream.on('data',(data)=>{});
            P1stream.on('error',(err)=>{
                reject(err);
            })
            P1stream.on('end',async()=>{
                console.log("Script converted to executuable form");
                const P2=await container.exec({Cmd:['/bin/sh','-c','./nodeShell.sh > /proc/1/fd/1 2>/proc/1/fd/2'],AttachStdout:true,AttachStderr:true});
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