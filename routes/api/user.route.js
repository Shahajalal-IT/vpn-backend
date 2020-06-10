const express = require('express');
const router = express.Router();
const resellerAuth = require('../../auth/reseller.auth');

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

// Export the Router
module.exports = router;