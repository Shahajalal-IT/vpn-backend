const express = require('express');
const router = express.Router();
const adminAuth = require('../../auth/admin.auth');
const resellerAuth = require('../../auth/reseller.auth');

//Get All User Details Report--------------------------
const getAllUserDetails = require('../../controllers/report/user.details.controller');
router.post('/get-all-user-details', adminAuth, getAllUserDetails.sendUserDetails);

// Export the Router
module.exports = router;