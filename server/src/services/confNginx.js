const Docker=require('dockerode');
const {exec}=require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);


const fs=require('fs');
const confNginx=async(containerName,subDomain)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            //const containerId=container.id; 
            const docker=new Docker();
            const nginx=await docker.getContainer('nginx');
            const configData = `server {
           listen 80;
              server_name ${subDomain}.localhost;  # Subdomain for user2

                   location / {
                    proxy_pass http://${containerName}:8080/;  # Proxy to user2's container
                    proxy_set_header Host $host;
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header X-Forwarded-Proto $scheme;
             }
           }`;
            const filePath = `${process.env.ROOT_PATH}/server/src/nginxConfigurations/${containerName}.conf`;

            fs.writeFileSync(filePath, configData, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`Configuration saved to ${filePath}`);
                }
            });
            await execPromise(`docker cp ${process.env.ROOT_PATH}/server/src/nginxConfigurations/${containerName}.conf ${nginx.id}:/etc/nginx/sites/${containerName}.conf`);
            await execPromise(`docker exec ${nginx.id} nginx -s reload`);
            console.log(`nginx configured for the container`);
            await execPromise(`rm ${process.env.ROOT_PATH}/server/src/nginxConfigurations/${containerName}.conf`);
            console.log(`nginx configuration file deleted`);
            resolve(`Configuration saved to ${filePath}`);
        }catch(err){
            console.log(err)
            reject(err);
        }
    }); 
}
module.exports=confNginx;