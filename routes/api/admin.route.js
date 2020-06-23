const express = require('express');
const router = express.Router();
const superAdminAuth = require('../../auth/superadmin.auth');
const adminAuth = require('../../auth/admin.auth');

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

//get Admin Info--------------------------
const getAdminInfo = require('../../controllers/admin/send.admin.info.controller');
router.post('/get-admin-info', adminAuth, getAdminInfo.getAdminInfo);

//get Admin Info--------------------------
const sendHomePageData = require('../../controllers/admin/send.home.page.data.controller');
router.post('/send-home-page-data', adminAuth, sendHomePageData.sendHomePageData);

//Update Admin Profile--------------------------
const updateAdminProfile = require('../../controllers/admin/update.admin.profile.controller');
router.post('/update-admin-profile', adminAuth, updateAdminProfile.updateAdmin);

//Update Admin Profile--------------------------
const updateAdminSiteData = require('../../controllers/admin/update.site.data.controller');
router.post('/update-site-data', adminAuth, updateAdminSiteData.updateAdminSiteData);

// Export the Router
module.exports = router;