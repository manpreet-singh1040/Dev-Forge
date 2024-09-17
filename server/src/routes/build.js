const express = require('express');
const router = express.Router();

const buildController = require('../controllers/build.js');

router.post('/', buildController);
module.exports = router;