/**
 * User Details Controller
 */

const admin = require("../../models/admin.model");
const reseller = require("../../models/resellers.model");
const user = require("../../models/users.model");
const transaction = require("../../models/transactions.model");
exports.sendUserDetails = (req, res, next) => {
    const adminId = req.adminData.userId;

    let startDate = new Date();
    startDate.setHours(0,0,0,0);

    let endDate = new Date();
    endDate.setHours(23,59,59,999);

    var data = {};

                user.countDocuments({creator: adminId, creator_type:'admin'}).then(ownuser => {
                    data.ownAccount = ownuser;

                    user.countDocuments({creator: adminId, creator_type:'admin',device:'android'}).then(androiduser => {
                        data.androiduser = androiduser;
                        console.log(data);
                        user.countDocuments({creator: adminId, creator_type: 'admin', device: 'ios'}).then(iosuser => {
                            data.iosuser = iosuser;
                            user.countDocuments({
                                creator: adminId,
                                creator_type: 'admin',
                                created_at: {
                                    $gte:startDate,
                                    $lte:endDate
                                }
                            }).then(todaycreatedbyadmin => {
                                data.todaycreatedbyadmin = todaycreatedbyadmin;

                                user.countDocuments({
                                    admin_id: adminId,
                                    creator_type: 'reseller'
                                }).then(resellerAccount => {
                                    data.resellerAccount = resellerAccount;
                                    user.countDocuments({
                                        admin_id: adminId,
                                        creator_type: 'reseller',
                                        created_at: {
                                            $gte:startDate,
                                            $lte:endDate
                                        }
                                    }).then(todaysellbyreseller => {
                                        data.todaysellbyreseller = todaysellbyreseller;
                                        user.countDocuments({admin_id: adminId, active: 1}).then(onlineAccount => {
                                            data.online = onlineAccount;
                                            user.countDocuments({
                                                admin_id: adminId,
                                                active: 0
                                            }).then(offlineaccounts => {
                                                data.offline = offlineaccounts;
                                                user.countDocuments({
                                                    admin_id: adminId,
                                                    status: 1
                                                }).then(activeAccount => {
                                                    data.activeAccount = activeAccount;
                                                    user.countDocuments({
                                                        admin_id: adminId, status: 0, activated_at: {
                                                            $exists: false
                                                        }
                                                    }).then(inactiveAccount => {
                                                        data.inactiveAccount = inactiveAccount;
                                                        user.countDocuments({
                                                            admin_id: adminId, status: 0, activated_at: {
                                                                $exists: true
                                                            }
                                                        }).then(lockaccount => {
                                                            data.lockaccount = lockaccount;
                                                            user.countDocuments({
                                                                admin_id: adminId, expired_at: {
                                                                    $lt: Date.now()
                                                                }
                                                            }).then(expiredAccount => {
                                                                data.expiredAccount = expiredAccount;

                                                                user.find({admin_id: adminId}).then(userDetails => {

                                                                    data.user_details = userDetails;

                                                                    user.find({
                                                                        admin_id: adminId, expired_at: {
                                                                            $lt: Date.now()
                                                                        }
                                                                    }).then(expiredAccount => {

                                                                        data.expiredaccounts = expiredAccount;

                                                                        reseller.find({
                                                                            admin_id: adminId,
                                                                        }, {
                                                                            user: 1,
                                                                            email: 1,
                                                                            balance: 1,
                                                                            android_price: 1,
                                                                            ios_price: 1,
                                                                            status: 1,
                                                                            created_at:1
                                                                        })
                                                                            .then(
                                                                                resellerList => {
                                                                                    data.resellerList = resellerList;

                                                                                    transaction.find({given_by: adminId, given_by_type:'admin'}).populate('given_to').then(transactiondata => {

                                                                                        if(transactiondata.length === 0){
                                                                                            data.transaction = transactiondata;

                                                                                            res.status(200).json({
                                                                                                data: data,
                                                                                                msg: "Successfully Read User Details Data",
                                                                                                error: false
                                                                                            })
                                                                                        }

                                                                                        data.transaction = transactiondata;

                                                                                        res.status(200).json({
                                                                                            data: data,
                                                                                            msg: "Successfully Read User Details Data",
                                                                                            error: false
                                                                                        })
                                                                                    })
                                                                                }
                                                                            )
                                                                            .catch(error => {
                                                                                console.log(error)
                                                                                return res.status(400).json({
                                                                                    error: true,
                                                                                    msg: "Reseller Reading Was Unsuccessful",
                                                                                    err: error
                                                                                })
                                                                            })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
            }
        )
        .catch(error => {
            console.log(error)
            return res.status(400).json({error: true, msg: "Home Page Reading Was Unsuccessful",err: error})
        })
};