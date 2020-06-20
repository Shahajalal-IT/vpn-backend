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

module.exports = router;