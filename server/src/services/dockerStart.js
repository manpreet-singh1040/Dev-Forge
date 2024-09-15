
const startDocker=()=>{

    const Docker=require("dockerode");
    const os=require('os');
    let docker;
    if (os.platform() === 'win32') {
        docker = new Docker({ socketPath: '//./pipe/docker_engine' });
        console.log("Windows Docker started");
    } else {
        console.log("linux  Docker starting");
        docker = new Docker({ socketPath: '/var/run/docker.sock' });
    }
    console.log("Docker started");
    return true;
}

module.exports=startDocker;