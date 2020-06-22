const express = require('express');
const router = express.Router();
const adminAuth = require('../../auth/admin.auth');
const resellerAuth = require('../../auth/reseller.auth');

//Create Reseller--------------------------
const reseller = require('../../controllers/reseller/create.controller');
router.post('/create', adminAuth, reseller.createReseller);

//Delete Reseller--------------------------
const deleteReseller = require('../../controllers/reseller/delete.controller');
router.post('/delete', adminAuth, deleteReseller.deleteReseller);

//Update Reseller--------------------------
const updateReseller = require('../../controllers/reseller/update.controller');
router.post('/update', updateReseller.updateReseller);

//Get All Reseller--------------------------
const getAllReseller = require('../../controllers/reseller/getall.controller');
router.post('/getall', adminAuth, getAllReseller.getAllReseller);

//Login Reseller--------------------------
const loginReseller = require('../../controllers/reseller/login.controller');
router.post('/login', loginReseller.resellerLogin);

//Add Balance to Reseller--------------------------
const addBalance = require('../../controllers/reseller/addbalance.controller');
router.post('/add-balance', adminAuth, addBalance.addBalanceReseller);

//Cut Balance from Reseller--------------------------
const cutBalance = require('../../controllers/reseller/cutbalance.controller');
router.post('/cut-balance', adminAuth, cutBalance.cutBalanceReseller);

//Get Reseller By Id--------------------------
const getResellerById = require('../../controllers/reseller/get.by.id.controller');
router.post('/get-by-id', getResellerById.getResellerById);

//Get Reseller For Dropdown--------------------------
const getResellerForDropdown = require('../../controllers/reseller/getall.for.dropdown.controller');
router.post('/get-all-for-dropdown', adminAuth, getResellerForDropdown.getAllForDropdown);

//Active Status--------------------------
const activeStatus = require('../../controllers/reseller/active.status.conrtoller');
router.post('/active-status', activeStatus.activeStatus);

//Deactive Status--------------------------
const deactiveStatus = require('../../controllers/reseller/deactive.status.conrtoller');
router.post('/deactive-status', deactiveStatus.deactiveStatus);

//Send Reseller Data--------------------------
const sendResellerData = require('../../controllers/reseller/send.reseller.info.controller');
router.post('/send-reseller-data', resellerAuth, sendResellerData.getResellerInfo);

//Create Sub Reseller--------------------------
const createSubReseller = require('../../controllers/reseller/create.subreseller.controller');
router.post('/create-sub-reseller', resellerAuth, createSubReseller.createReseller);

//Get All Sub Reseller For Dropdown--------------------------
const getAllSubReseller = require('../../controllers/reseller/getall.subreseller.for.dropdown.controller');
router.post('/get-all-sub-reseller-for-dropdown', resellerAuth, getAllSubReseller.getAllForDropdown);

//Add Balance To Sub Reseller--------------------------
const addBalanceToSubReseller = require('../../controllers/reseller/addbalance.to.subreseller.controller');
router.post('/add-balance-to-sub-reseller', resellerAuth, addBalanceToSubReseller.addBalanceReseller);

//Cut Balance from Sub Reseller--------------------------
const cutBalanceFromSubReseller = require('../../controllers/reseller/cutbalance.from.subreseller.controller');
router.post('/cut-balance-from-sub-reseller', resellerAuth, cutBalanceFromSubReseller.cutBalanceReseller);

// Export the Router
module.exports = router;