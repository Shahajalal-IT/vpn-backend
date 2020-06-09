const express = require('express');
const router = express.Router();
const resellerAuth = require('../../auth/reseller.auth');

//User Create--------------------------
const createUser = require('../../controllers/user/create.controller');
router.post('/create', resellerAuth, createUser.createUser);

//User Delete--------------------------
const deleteUser = require('../../controllers/user/delete.controller');
router.post('/delete', resellerAuth, deleteUser.deleteUser);

// Export the Router
module.exports = router;