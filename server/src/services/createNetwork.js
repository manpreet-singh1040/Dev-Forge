const Docker = require('dockerode');
const docker = new Docker(); 
const createNetwork=()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const network=await docker.createNetwork({
                Name:`devf`,
                Driver:'bridge'
            });
            resolve(network);
        }catch(err){
            console.log(err);
            reject(err);
        }
    })
}


module.exports = createNetwork;

