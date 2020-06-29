const express = require('express');
const router = express.Router();
const adminAuth = require('../../auth/admin.auth');
const resellerAuth = require('../../auth/reseller.auth');

//Get All Reseller Transaction for Admin--------------------------
const getAllResellerTransaction = require('../../controllers/resellertransaction/get.all.by.reseller.id.controller');
router.post('/get-all-reseller-transaction', adminAuth, getAllResellerTransaction.getAllResTransByResellerId);


// Export the Router
module.exports = router;