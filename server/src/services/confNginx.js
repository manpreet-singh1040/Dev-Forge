const Docker=require('dockerode');
const {exec}=require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const docker = new Docker();

const fs=require('fs');



const confNginx=async(containerName,subDomain,serviceType,container)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            //const containerId=container.id; 
            console.log(`in nginx config`);
            let containerId=docker.getContainer(containerName);
            console.log(`got container id`);
            let containerIp=await getContainerIP(containerName);
            console.log(`got container ip`);
            const nginx=await docker.getContainer('nginx');
            const configData = `

            upstream myapp {
    server ${containerName}:8080 fail_timeout=5s;  # Primary container
    server backup:8080 backup;  # Backup container
}

server {
    listen 80;
    server_name ${subDomain}.localhost;  # Subdomain for user2

    location / {
        proxy_pass http://myapp;  # Proxy to the upstream block
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Handle errors gracefully
        proxy_intercept_errors on;
        error_page 502 = @fallback;  # Handle 502 Bad Gateway error
    }

    location @fallback {
        return 502 "Backend is unavailable";  # Custom error message
    }
}
`;
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

async function getContainerIP(containerName) {
    try {
        // Inspect the container to get detailed information
        const container = docker.getContainer(containerName);
        const containerInfo = await container.inspect();

        // Access the NetworkSettings to retrieve the IP address
        // Assuming the container is using the default network bridge
        const networks = containerInfo.NetworkSettings.Networks;
        
        // If using default bridge network, change 'bridge' to your network name if needed
        const networkName = 'devf';  // Or replace with your custom network name
        const ipAddress = networks[networkName].IPAddress;

        console.log(`Container IP Address: ${ipAddress}`);
        return ipAddress;
    } catch (error) {
        console.error(`Error fetching container IP: ${error.message}`);
    }
}


module.exports=confNginx;