const express = require('express');
const router = express.Router();
const adminAuth = require('../../auth/admin.auth');

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

// Export the Router
module.exports = router;