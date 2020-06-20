const express = require('express');
const router = express.Router();
const adminAuth = require('../../auth/admin.auth');

//Super Admin Create--------------------------
const getAllTransaction = require('../../controllers/transaction/getall.controller');
router.post('/get-all-transaction', adminAuth, getAllTransaction.getAllTransaction);

// Export the Router
module.exports = router;