
const createShellScript = async (scriptName, buildCommand,runCommand,directory) => {
    return new Promise(async (resolve, reject) => {
        try {
            const scriptContent = `#!/bin/bash \n git clone $REPO_URL \n cd $REPO_NAME/${directory} \n ${buildCommand} \n ${runCommand}`;
            const fs = require('fs');
            fs.writeFile(`${process.env.ROOT_PATH}/server/ShellScripts/${scriptName}`, scriptContent, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    }
    );
}
module.exports = createShellScript;