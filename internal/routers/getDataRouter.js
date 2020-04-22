const express = require('express');
const router = express.Router();

const getDataController=require('../controllers/getDataController');

router.get('/userDetails',getDataController.getUserData);
router.get('/timeTable',getDataController.getTimeTableStudent);
router.get('/courses',getDataController.getCoursesStudent);
router.post('/chapters',getDataController.getChaptersStudent);
router.post('/materials',getDataController.getMaterialsStudent);
router.get('/announcements',getDataController.getAnnouncements);
router.get('/teaches',getDataController.getTeaches);
router.get('/base/courses',getDataController.getCourses);


module.exports = router;