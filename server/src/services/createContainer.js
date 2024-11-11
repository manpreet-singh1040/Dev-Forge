const Docker=require('dockerode');
const fs=require('fs');
const {execSync}=require('child_process');
const {exec}=require('child_process');
const util = require('util');
const { constrainedMemory } = require('process');
const execPromise = util.promisify(exec);
const createContainer=(image,containerName,gitUrl,repo,subDomain)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const docker=new Docker();
            // const container=await docker.createContainer({
            //     Image:image,
            //     name:containerName,
            //     Tty:true,
            //     Env:[`REPO_URL=${gitUrl}`,`REPO_NAME=${repo}`],
            //     HostConfig:{
            //         NetworkMode: `devf`,
            //         CpuPeriod: 100000, // 100ms
            //         CpuQuota:25000, // 25% of cpu
            //         /*PortBindings:{
            //             "8080/tcp":[
            //                 {
            //                     "HostPort":"3000"
            //                 }
            //             ]
            //         }*/
            //     },
            //     ExposedPorts:{
            //         "8080/tcp":{}
            //     }
            // });

            // await container.start();
            let fileContent=`
services:
  ${containerName}:
      image: ${image}
      networks:
         - devf
      labels:
         - "traefik.enable=true"
         - "traefik.http.routers.${subDomain}.rule=Host(\`${subDomain}.localhost\`)"              
         - "traefik.http.routers.${subDomain}.entrypoints=web"                          
         - "traefik.http.services.${subDomain}.loadbalancer.server.port=8080"  
      deploy:
        resources:
          limits:
            cpus: '0.20'  # Equivalent to 25% CPU
      tty: true
      environment:
         - REPO_URL=${gitUrl}  # Replace with your repo URL
         - REPO_NAME=${repo}  # Replace with your repo name
      expose:
         - "8080"  # Expose port 8080 inside the container           
networks:
  devf:
   external: true
            `;
            fs.writeFileSync(`${process.env.ROOT_PATH}/server/treafik/docker-compose.${containerName}.yml`,fileContent);
            await execPromise(`cd ${process.env.ROOT_PATH}/server/treafik && docker compose -f docker-compose.${containerName}.yml up -d`);
            let container=docker.getContainer(`treafik-${containerName}-1`);
            await execPromise(`cd cd ${process.env.ROOT_PATH}/server/treafik && rm docker-compose.${containerName}.yml`);
            resolve(container);
        }catch(err){
            reject(err);
        }
    });
    
}

module.exports=createContainer;