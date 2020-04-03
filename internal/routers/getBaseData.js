const express = require('express');
const router = express.Router();

const baseController=require('../controllers/getSignUpData');

router.get('/getCollege',baseController.getColleges);
router.post('/getDepartment',baseController.getDepartments);
router.post('/getClass',baseController.getClasses);

module.exports = router;

