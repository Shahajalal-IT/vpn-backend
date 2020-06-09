const express = require('express');
const router = express.Router();
const superAdminAuth = require('../../auth/superadmin.auth');

//Admin Create--------------------------
const createAdmin = require('../../controllers/admin/create.controller');
router.post('/create', superAdminAuth, createAdmin.createAdmin);

//Admin Update--------------------------
const updateAdmin = require('../../controllers/admin/update.controller');
router.post('/update', updateAdmin.updateAdmin);

//Admin Delete--------------------------
const deleteAdmin = require('../../controllers/admin/delete.controller');
router.post('/delete', superAdminAuth, deleteAdmin.deleteAdmin);

//Read All Admin--------------------------
const readAllAdmin = require('../../controllers/admin/getall.controller');
router.post('/get-all', superAdminAuth, readAllAdmin.getAllAdmin);

//Log In Admin--------------------------
const loginAdmin = require('../../controllers/admin/login.controller');
router.post('/login',  loginAdmin.adminLogin);

// Export the Router
module.exports = router;