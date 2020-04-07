const express = require('express');
const router = express.Router();

const updateController=require('../controllers/updatesController');

router.post('/student',updateController.updateStudentData);

module.exports = router;