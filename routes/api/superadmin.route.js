const express = require('express');
const router = express.Router();

//Super Admin Create--------------------------
const createSuperAdmin = require('../../controllers/superadmin/create.controller');
router.post('/create', createSuperAdmin.createsuperAdmin);

//Super Admin Update--------------------------
const updateSuperAdmin = require('../../controllers/superadmin/update.controller');
router.post('/update', updateSuperAdmin.updateSuperAdmin);

//Super Admin Delete--------------------------
const deleteSuperAdmin = require('../../controllers/superadmin/delete.controller');
router.post('/delete', deleteSuperAdmin.deleteSuperAdmin);

//Super Admin Login--------------------------
const loginSuperAdmin = require('../../controllers/superadmin/login.controller');
router.post('/login', loginSuperAdmin.superAdminLogin);

// Export the Router
module.exports = router;