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

// Export the Router
module.exports = router;