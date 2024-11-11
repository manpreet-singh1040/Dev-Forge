const Docker=require('dockerode');
const docker=new Docker();
const {execSync,exec} =require('child_process');
const fs=require('fs');
const startTreafikCon=()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            execSync(`cd ${process.env.ROOT_PATH}/server/treafik && docker compose -f docker-compose.treafik.yml up -d`);
            resolve();
        }
        catch(err)
        {
            console.log("error-->"+err);
            reject();
        }
    });
};
module.exports=startTreafikCon;