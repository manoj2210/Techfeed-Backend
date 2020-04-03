const express = require('express');
const router = express.Router();

const baseController=require('../controllers/insertTable');

router.post('/addCollege',baseController.addCollege);
router.post('/addDepartment',baseController.addDepartment);
router.post('/addClass',baseController.addClass);
// router.post('/addCourse',baseController.addCourse);
// router.post('/addTeaches',baseController.addTeaches);
// router.post('/addStudies',baseController.addStudies);
// router.post('/addChapters',baseController.addChapters);
// router.post('/addMaterials',baseController.addMaterials);
// router.post('/addExam',baseController.addExam);
// router.post('/addTest',baseController.addTests);

module.exports = router;