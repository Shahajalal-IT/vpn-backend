const express = require('express');
const router = express.Router();
const resellerAuth = require('../../auth/reseller.auth');
const adminAuth = require('../../auth/admin.auth');

//User Create--------------------------
const createUser = require('../../controllers/user/create.controller');
router.post('/create', resellerAuth, createUser.createUser);

//User Delete--------------------------
const deleteUser = require('../../controllers/user/delete.controller');
router.post('/delete', resellerAuth, deleteUser.deleteUser);

//Vpn Connect--------------------------
const connectUser = require('../../controllers/user/connect.controller');
router.post('/connect', connectUser.connectVpn);

//Vpn Disconnect--------------------------
const disConnectUser = require('../../controllers/user/disconnect.controller');
router.post('/disconnect', disConnectUser.disConnectVpn);

//Create User By Admin--------------------------
const createUserByAdmin = require('../../controllers/user/create.by.admin.controller');
router.post('/create-user-by-admin', adminAuth, createUserByAdmin.createUser);

//Create Bulk User By Admin--------------------------
const createBulkUserByAdmin = require('../../controllers/user/create.bulk.by.admin.controller');
router.post('/create-bulk-user-by-admin', adminAuth, createBulkUserByAdmin.createUser);

//Get All User By Admin--------------------------
const getAllUserByAdmin = require('../../controllers/user/get.all.by.admin.controller');
router.post('/get-all-user-by-admin', adminAuth, getAllUserByAdmin.getAllUserByAdmin);

// Export the Router
module.exports = router;