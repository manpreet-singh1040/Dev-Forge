const fs=require('fs');

const confStaticNginx=async (deploymentId,subDomain)=>{
    return new Promise(async(resolve,reject)=>{
    try{
        const nginxData=`
        server {
    listen 80;
    server_name ${subDomain}.localhost;

    root /etc/nginx/staticContent/${deploymentId}/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /static {
        alias /etc/nginx/staticContent/${deploymentId}/build/static;
    }
}`;
        fs.writeFileSync(`${process.env.ROOT_PATH}/server/nginxData/sites-available/${deploymentId}.conf`,nginxData);
        // fs.symlinkSync(`${process.env.ROOT_PATH}/server/nginxData/sites-available/${userId}/static`,`${process.env.ROOT_PATH}/server/nginxData/sites-enabled/${userId}/static`);
        resolve(true);
    }
    catch(err){
        console.log(err);
        reject(err);
    }
});
};

module.exports=confStaticNginx;