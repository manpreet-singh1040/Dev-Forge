const Docker=require('dockerode');
const createContainer=(image,containerName,gitUrl,repo)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const docker=new Docker();
            const container=await docker.createContainer({
                Image:image,
                name:containerName,
                Tty:true,
                Env:[`REPO_URL=${gitUrl}`,`REPO_NAME=${repo}`]
            });
            await container.start();
            resolve(container);
        }catch(err){
            reject(err);
        }
    });
    
}

module.exports=createContainer;