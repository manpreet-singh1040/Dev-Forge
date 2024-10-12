const express = require('express');
const router = express.Router();
const UserContainer = require('../models/usercontainer');
const Container = require('../models/container');
router.get('/',async (req, res) => {
    try{
        let data=await UserContainer.findOne({userId:req.body.userId});
        data=data[0];
        let services=[];
        for (const containerId of data.containerIds) {
            let container = await Container.findOne({ containerId });
            let temp = {
                containerType: container.containerType,
                containerImage: container.containerImage,
                gitUrl: container.gitUrl,
                repo: container.repo,
                buildCommand: container.buildCommand,
                runCommand: container.runCommand,
                subDomain: container.subDomain,
                directory: container.directory
            };
            services.push(temp);
        }
        res.json({ status:true,services });        
    }
    catch(err){
        console.log(err);
        res.status(500).json({ status:false,message: 'Internal server error' });
    }
    //res.json({ status: true });
});

module.exports = router;