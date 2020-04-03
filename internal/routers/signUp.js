const express = require('express');
const router = express.Router();
const signUpControllerInsert=require('../controllers/signUp');

router.post('/addStudent',signUpControllerInsert.signUpStudent);
router.post('/addTeacher',signUpControllerInsert.signUpTeacher);

module.exports = router;