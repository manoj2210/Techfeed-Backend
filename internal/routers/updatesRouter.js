const express = require('express');
const router = express.Router();

const updateController=require('../controllers/updatesController');

router.post('/userDetails',updateController.updateStudentData);

module.exports = router;