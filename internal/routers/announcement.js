const express = require('express');
const router = express.Router();

const insertTable=require('../controllers/insertTable');

router.post('/add',insertTable.addAnnouncement);

module.exports = router;