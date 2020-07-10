/**
 * Send Home page value Controller
 */

const admin = require("../../models/admin.model");
const reseller = require("../../models/resellers.model");
const user = require("../../models/users.model");

exports.sendHomePageData = (req, res, next) => {
    const adminId = req.adminData.userId;

    var data = {};

    reseller.countDocuments({creator: adminId })
        .then(
            documents => {
                data.resellerCount = documents;
                user.countDocuments({creator: adminId, creator_type:'admin'}).then(ownuser => {
                    data.ownAccount = ownuser;
                    user.countDocuments({admin_id: adminId, creator_type:'reseller'}).then(resellerAccount => {
                        data.resellerAccount = resellerAccount;
                        user.countDocuments({admin_id: adminId,active:1}).then(onlineAccount => {
                            data.online = onlineAccount;
                            user.countDocuments({admin_id: adminId,status:1}).then(activeAccount => {
                                data.activeAccount = activeAccount;
                                user.countDocuments({admin_id: adminId,expired_at:{
                                            $lt: Date.now()
                                        }}).then(expiredAccount => {
                                    data.expiredAccount = expiredAccount;

                                    reseller.find({creator: adminId,status:1} ,{'user':1})
                                        .then(
                                            resellerList => {
                                                data.resellerList = resellerList;

                                                res.status(200).json({
                                                    data: data,
                                                    msg: "Successfully Read Home Page Data",
                                                    error:false
                                                })
                                            }
                                        )
                                        .catch(error => {
                                            return res.status(400).json({error: true, msg: "Reseller Reading Was Unsuccessful",err: error})
                                        })

                                })
                            })
                        })
                    })
                })
            }
        )
        .catch(error => {
            return res.status(400).json({error: true, msg: "Home Page Reading Was Unsuccessful",err: error})
        })
};