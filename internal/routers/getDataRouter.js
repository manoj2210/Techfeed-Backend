const express = require('express');
const router = express.Router();

const getDataController=require('../controllers/getDataController');

router.get('/userDetails',getDataController.getUserData);

module.exports = router;