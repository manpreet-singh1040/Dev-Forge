
const Docker=require('dockerode');
const createNginxCon=()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const docker=new Docker();
            const container=await docker.createContainer({
                Image:'povtemp/nginx-devforge',
                name:'nginx',
                Tty:true,
                HostConfig:{
                    NetworkMode: `devf`,
                    PortBindings:{
                        "80/tcp":[
                            {
                                "HostPort":"8080"
                            }
                        ]
                    }
                },
                exposedPorts:{
                    "80/tcp":{}
                }
            });
            await container.start();
            resolve(container);
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}
module.exports=createNginxCon;