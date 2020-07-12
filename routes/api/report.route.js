const express = require('express');
const router = express.Router();
const adminAuth = require('../../auth/admin.auth');
const resellerAuth = require('../../auth/reseller.auth');

//Get All User Details Report--------------------------
const getAllUserDetails = require('../../controllers/report/user.details.controller');
router.post('/get-all-user-details', adminAuth, getAllUserDetails.sendUserDetails);

//Get All User Details Report For Reseller--------------------------
const getAllUserDetailsForReseller = require('../../controllers/report/user.details.controller.for.reseller');
router.post('/get-all-user-details-reseller', resellerAuth, getAllUserDetailsForReseller.sendUserDetails);

//Get All User Billings Report--------------------------
const getAllBillingsDetails = require('../../controllers/report/billing.details.controller');
router.post('/get-all-billings-details', adminAuth, getAllBillingsDetails.sendBillingsDetails);

//Get All User Billings Report For Reseller--------------------------
const getAllBillingsDetailsForReseller = require('../../controllers/report/billings.details.for.reseller.controller');
router.post('/get-all-billings-details-reseller', resellerAuth, getAllBillingsDetailsForReseller.sendBillingsDetails);

// Export the Router
module.exports = router;