const express = require('express');
const router = express.Router();
const insertTable=require('../controllers/insertTable');
const updateController=require('../controllers/updatesController');

router.post('/userDetails',updateController.updateUserDetails);
router.post('/teaches',insertTable.addTeaches);
router.post('/announcement',insertTable.addAnnouncement);
router.post('/materials',insertTable.addMaterial);

module.exports = router;