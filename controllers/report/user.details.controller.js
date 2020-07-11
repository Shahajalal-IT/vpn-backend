/**
 * User Details Controller
 */

const admin = require("../../models/admin.model");
const reseller = require("../../models/resellers.model");
const user = require("../../models/users.model");
const transaction = require("../../models/transactions.model");
exports.sendUserDetails = (req, res, next) => {
    const adminId = req.adminData.userId;

    var data = {};

                user.countDocuments({creator: adminId, creator_type:'admin'}).then(ownuser => {
                    data.ownAccount = ownuser;
                    user.countDocuments({creator: adminId, creator_type:'admin',device:'android'}).then(androiduser => {
                        data.androiduser = androiduser;
                        user.countDocuments({creator: adminId, creator_type: 'admin', device: 'ios'}).then(iosuser => {
                            data.iosuser = iosuser;
                            user.countDocuments({
                                creator: adminId,
                                creator_type: 'admin',
                                created_at: {$eq: Date.now()}
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
                                        created_at: {$eq: Date.now()}
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
                                                                            status: 1
                                                                        })
                                                                            .then(
                                                                                resellerList => {
                                                                                    data.resellerList = resellerList;

                                                                                    transaction.find({given_by: adminId, given_by_type:'admin',}).then(transactiondata => {
                                                                                        var finalDocuments = [];
                                                                                        var i=0;
                                                                                        transactiondata.forEach(function(obj) {

                                                                                            reseller.findById(obj.given_to).then(result => {
                                                                                                if(result === null){

                                                                                                }else {
                                                                                                    var newObj = {
                                                                                                        _id: obj._id,
                                                                                                        given_to: result.user,
                                                                                                        given_to_id: obj.given_to,
                                                                                                        previous_balance: obj.previous_balance,
                                                                                                        current_balance: obj.current_balance,
                                                                                                        transaction_type: result.transaction_type,
                                                                                                        notes: obj.notes,
                                                                                                        createdAt: obj.createdAt
                                                                                                    };
                                                                                                    finalDocuments.push(newObj);

                                                                                                }

                                                                                                if (i === transactiondata.length - 1) {
                                                                                                    data.transaction = finalDocuments;
                                                                                                    res.status(200).json({
                                                                                                        data: data,
                                                                                                        msg: "Successfully Read User Details Data",
                                                                                                        error: false
                                                                                                    })
                                                                                                }
                                                                                                i++;
                                                                                            })

                                                                                        })
                                                                                    })
                                                                                }
                                                                            )
                                                                            .catch(error => {
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
            return res.status(400).json({error: true, msg: "Home Page Reading Was Unsuccessful",err: error})
        })
};