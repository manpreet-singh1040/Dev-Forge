const express=require('express');
const router = express.Router();


const redeployController = require('../controllers/redeploy');
// router.post('/', async (req, res) => {
//     console.log(req.body.params);
//     console.log("hey baby!!");
//     res.json({status:true});
// });
router.post('/', redeployController);

module.exports = router;