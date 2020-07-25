const express = require('express');
const router = express.Router();
const adminAuth = require('../../auth/admin.auth');
const resellerAuth = require('../../auth/reseller.auth');

//Login Reseller--------------------------
const loginReseller = require('../../controllers/mobileapi/reseller.login.controller');
router.post('/login', loginReseller.resellerLogin);

//Create Shop--------------------------
const createShop = require('../../controllers/mobileapi/create.shop.controller');
router.post('/create', resellerAuth, createShop.createReseller);

//Get All Shop--------------------------
const getAllShop = require('../../controllers/mobileapi/get.shop.id.name');
router.post('/get-all-shop', resellerAuth, getAllShop.getAllForDropdown);

//Add Bill--------------------------
const addBill = require('../../controllers/mobileapi/add.bill.controller');
router.post('/add-bill', resellerAuth, addBill.addDueReseller);

//Assign Creator--------------------------
const assignCreator = require('../../controllers/mobileapi/assign.creator');
router.post('/assign-creator', resellerAuth, assignCreator.assignCreator);

// Export the Router
module.exports = router;