const express = require('express');
const router = express.Router();
const adminAuth = require('../../auth/admin.auth');
const resellerAuth = require('../../auth/reseller.auth');

//Get All Transaction for Admin--------------------------
const getAllTransaction = require('../../controllers/transaction/getall.controller');
router.post('/get-all-transaction', adminAuth, getAllTransaction.getAllTransaction);

//Get All Transaction for Reseller--------------------------
const getAllTransactionReseller = require('../../controllers/transaction/getall.for.reseller');
router.post('/get-all-transaction-reseller', resellerAuth, getAllTransactionReseller.getAllTransaction);

// Export the Router
module.exports = router;