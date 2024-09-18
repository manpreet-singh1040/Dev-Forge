const Docker=require('dockerode');
const createContainer=(image,containerName,gitUrl,repo)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const docker=new Docker();
            const container=await docker.createContainer({
                Image:image,
                name:containerName,
                Tty:true,
                Env:[`REPO_URL=${gitUrl}`,`REPO_NAME=${repo}`],
                HostConfig:{
                    CpuPeriod: 100000, // 100ms
                    CpuQuota:25000, // 25% of cpu
                    PortBindings:{
                        "8080/tcp":[
                            {
                                "HostPort":"3000"
                            }
                        ]
                    }
                },
                ExposedPorts:{
                    "8080/tcp":{}
                }
            });
            await container.start();
            resolve(container);
        }catch(err){
            reject(err);
        }
    });
    
}

module.exports=createContainer;