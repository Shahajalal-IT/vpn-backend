const express = require('express');
const router = express.Router();
const resellerAuth = require('../../auth/reseller.auth');
const adminAuth = require('../../auth/admin.auth');

// //User Create--------------------------
// const createUser = require('../../controllers/user/create.controller');
// router.post('/create', resellerAuth, createUser.createUser);

// //Bulk User Create by reseller--------------------------
// const bulkcreateUserByReseller = require('../../controllers/user/create.bulk.controller');
// router.post('/create-bulk-by-reseller', resellerAuth, bulkcreateUserByReseller.createUser);
//
// //User Delete--------------------------
// const deleteUser = require('../../controllers/user/delete.controller');
// router.post('/delete', deleteUser.deleteUser);
//
// //Vpn Connect--------------------------
// const connectUser = require('../../controllers/user/connect.controller');
// router.post('/connect', connectUser.connectVpn);
//
// //Vpn Disconnect--------------------------
// const disConnectUser = require('../../controllers/user/disconnect.controller');
// router.post('/disconnect', disConnectUser.disConnectVpn);

//Create User By Admin--------------------------
const createUserByAdmin = require('../../controllers/user/create.by.admin.controller');
router.post('/create-user-by-admin', adminAuth, createUserByAdmin.createUser);

//Create Bulk User By Admin--------------------------
const createBulkUserByAdmin = require('../../controllers/user/create.bulk.by.admin.controller');
router.post('/create-bulk-user-by-admin', adminAuth, createBulkUserByAdmin.createUser);

//Get All User By Admin--------------------------
const getAllUserByAdmin = require('../../controllers/user/get.all.by.admin.controller');
router.post('/get-all-user-by-admin', adminAuth, getAllUserByAdmin.getAllUserByAdmin);

//Update User--------------------------
const updateUser = require('../../controllers/user/update.controller');
router.post('/update-user', updateUser.updateUser);
//
// //Get User By ID--------------------------
// const getUserById = require('../../controllers/user/get.by.id.controller');
// router.post('/get-user-by-id', getUserById.getUserById);
//
// //Get User By user--------------------------
// const getUserByUser = require('../../controllers/user/get.by.user.controller');
// router.post('/get-user-by-user', getUserByUser.getUserByUser);
//
// //Deactive User By ID--------------------------
// const deactiveUser = require('../../controllers/user/deactive.controller');
// router.post('/deactive-user', deactiveUser.deactiveUser);
//
// //Active User By ID--------------------------
// const activeUser = require('../../controllers/user/active.controller');
// router.post('/active-user', activeUser.activeUser);
//
// //Get All User by Reseller--------------------------
// const getAllUserByReseller = require('../../controllers/user/get.all.by.reseller.controller');
// router.post('/get-all-user-by-reseller',resellerAuth, getAllUserByReseller.getAllUserByReseller);
//
// //Reset Phone Unique--------------------------
// const resetPhoneUnique = require('../../controllers/user/reset.phone_unique.controller');
// router.post('/reset-phone-unique', resetPhoneUnique.resetPhoneUnique);
//
// //Connect Vpn Using Pin--------------------------
// const connectUsingPin = require('../../controllers/user/connect.using.pin.controller');
// router.post('/connect-using-pin', connectUsingPin.connectVpnUsingPin);
//
// //DisConnect Vpn Using Pin--------------------------
// const disConnectUsingPin = require('../../controllers/user/disconnect.using.pin.controller');
// router.post('/disconnect-using-pin', disConnectUsingPin.disConnectVpn);
//
// //Get all Vpn User by Reseller id--------------------------
// const getAllVPNUserByResId = require('../../controllers/user/get.all.by.reseller.id.controller');
// router.post('/get-all-user-by-reseller-id', getAllVPNUserByResId.getAllUserByReseller);

// Export the Router
module.exports = router;