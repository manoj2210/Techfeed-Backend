const express = require('express');
const router = express.Router();
const signUpControllerInsert=require('../controllers/insertTable');

router.post('/addStudent',signUpControllerInsert.addStudent);
router.post('/addTeacher',signUpControllerInsert.addTeacher);



module.exports = router;