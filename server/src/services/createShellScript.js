
const createShellScript = async (scriptName, buildCommand,runCommand) => {
    return new Promise(async (resolve, reject) => {
        try {
            const scriptContent = `#!/bin/bash \n git clone $REPO_URL \n cd $REPO_NAME \n ${buildCommand} \n ${runCommand}`;
            const fs = require('fs');
            fs.writeFile(`${process.env.ROOT_PATH}/server/ShellScripts/${scriptName}`, scriptContent, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        } catch (err) {
            reject(err);
        }
    }
    );
}
module.exports = createShellScript;