const express = require('express');
const router = express.Router();

const getDataController=require('../controllers/getDataController');

router.get('/userDetails',getDataController.getUserData);
router.get('/timeTable',getDataController.getTimeTableStudent);
router.get('/courses',getDataController.getCoursesStudent);


module.exports = router;