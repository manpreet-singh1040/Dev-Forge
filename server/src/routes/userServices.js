const express = require('express');
const router = express.Router();
const UserContainer = require('../models/usercontainer');
const Container = require('../models/container');
router.get('/',async (req, res) => {
    try{
        let data=await UserContainer.findOne({userId:req.body.userId});
        //data=data[0];
        let services=[];
        for (const containerId of data.containerIds) {
            let container = await Container.findOne({ containerId });
            let temp = {
                type: container.containerType,
                environment: container.containerImage,
                gitUrl: container.gitUrl,
                repo: container.repo,
                subDomain: container.subDomain,
            };
            services.push(temp);
        }
        console.log(services);
        res.json({ status:true,services });        
    }
    catch(err){
        console.log(err);
        res.status(500).json({ status:false,message: 'Internal server error' });
    }
    //res.json({ status: true });
});

module.exports = router;