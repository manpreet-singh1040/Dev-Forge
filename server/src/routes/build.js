const express = require('express');
const router = express.Router();

const buildController = require('../controllers/build.js');

router.post('/', buildController);
// router.post('/',async(req,res)=>{
//     res.status(200);
//     res.json({status:true,id:5});
// })
module.exports = router;