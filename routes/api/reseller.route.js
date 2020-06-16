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
router.post('/add-balance', addBalance.addBalanceReseller);

//Cut Balance from Reseller--------------------------
const cutBalance = require('../../controllers/reseller/cutbalance.controller');
router.post('/cut-balance', cutBalance.cutBalanceReseller);

//Get Reseller By Id--------------------------
const getResellerById = require('../../controllers/reseller/get.by.id.controller');
router.post('/get-by-id', getResellerById.getResellerById);

// Export the Router
module.exports = router;