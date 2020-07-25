var express = require('express')

let router = express.Router()
// Admin Routes------------------
let admin = require('./api/admin.route');
router.use('/admin', admin);

// superAdmin Routes------------------
let superAdmin = require('./api/superadmin.route');
router.use('/super-admin', superAdmin);

// Reseller Routes------------------
let reseller = require('./api/reseller.route');
router.use('/reseller', reseller);

// User Routes------------------
let user = require('./api/user.route');
router.use('/user', user);

// Transaction Routes------------------
let transaction = require('./api/transaction.route');
router.use('/transaction', transaction);

// Reseller Transaction Routes------------------
let reseller_transaction = require('./api/reseller.transaction.route');
router.use('/reseller-transaction', reseller_transaction);

// Admin Report Routes------------------
let report = require('./api/report.route');
router.use('/report', report);

// Mobile Api Routes------------------
let mobile_api = require('./api/mobile.api.route');
router.use('/mobile-api', mobile_api);

module.exports = router;