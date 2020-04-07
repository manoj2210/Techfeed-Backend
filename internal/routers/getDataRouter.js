const express = require('express');
const router = express.Router();

const getDataController=require('../controllers/getDataController');

router.get('/student',getDataController.getStudentData);

module.exports = router;