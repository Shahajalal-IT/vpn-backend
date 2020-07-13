
/**
 * User Details Controller For Reseller
 */

const admin = require("../../models/admin.model");
const reseller = require("../../models/resellers.model");
const user = require("../../models/users.model");
const transaction = require("../../models/transactions.model");
exports.sendUserDetails = (req, res, next) => {
    const resellerId = req.resellerData.userId;

    let startDate = new Date();
    startDate.setHours(0,0,0,0);

    let endDate = new Date();
    endDate.setHours(23,59,59,999);

    var data = {};

    user.countDocuments({creator: resellerId, creator_type:'reseller'}).then(ownuser => {
            data.ownAccount = ownuser;
            user.countDocuments({creator: resellerId, creator_type:'reseller',device:'android'}).then(androiduser => {
                data.androiduser = androiduser;
                user.countDocuments({creator: resellerId, creator_type:'reseller', device: 'ios'}).then(iosuser => {
                    data.iosuser = iosuser;
                    user.countDocuments({
                        creator: resellerId, creator_type:'reseller',
                        created_at: {
                            $gte:startDate,
                            $lte:endDate
                        }
                    }).then(todaycreatedbyadmin => {
                        data.todaycreatedbyadmin = todaycreatedbyadmin;
                        user.countDocuments({
                            creator: resellerId,
                            creator_type: 'reseller'
                        }).then(resellerAccount => {
                            data.resellerAccount = resellerAccount;
                            user.countDocuments({
                                creator: resellerId,
                                creator_type: 'reseller',
                                created_at: {
                                    $gte:startDate,
                                    $lte:endDate
                                }
                            }).then(todaysellbyreseller => {
                                data.todaysellbyreseller = todaysellbyreseller;
                                user.countDocuments({creator: resellerId, active: 1}).then(onlineAccount => {
                                    data.online = onlineAccount;
                                    user.countDocuments({
                                        creator: resellerId,
                                        active: 0
                                    }).then(offlineaccounts => {
                                        data.offline = offlineaccounts;
                                        user.countDocuments({
                                            creator: resellerId,
                                            status: 1
                                        }).then(activeAccount => {
                                            data.activeAccount = activeAccount;
                                            user.countDocuments({
                                                creator: resellerId, status: 0, activated_at: {
                                                    $exists: false
                                                }
                                            }).then(inactiveAccount => {
                                                data.inactiveAccount = inactiveAccount;
                                                user.countDocuments({
                                                    creator: resellerId, status: 0, activated_at: {
                                                        $exists: true
                                                    }
                                                }).then(lockaccount => {
                                                    data.lockaccount = lockaccount;
                                                    user.countDocuments({
                                                        creator: resellerId, expired_at: {
                                                            $lt: Date.now()
                                                        }
                                                    }).then(expiredAccount => {
                                                        data.expiredAccount = expiredAccount;

                                                        user.find({creator: resellerId}).then(userDetails => {

                                                            data.user_details = userDetails;

                                                            user.find({
                                                                creator: resellerId, expired_at: {
                                                                    $lt: Date.now()
                                                                }
                                                            }).then(expiredAccount => {

                                                                data.expiredaccounts = expiredAccount;

                                                                reseller.find({
                                                                    creator: resellerId,
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

                                                                            transaction.find({given_by: resellerId, given_by_type:'reseller',}).then(transactiondata => {

                                                                                if(transactiondata.length === 0){
                                                                                    data.transaction = transactiondata;

                                                                                    res.status(200).json({
                                                                                        data: data,
                                                                                        msg: "Successfully Read User Details Data",
                                                                                        error: false
                                                                                    })
                                                                                }

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
                                                                                                transaction_type: obj.transaction_type,
                                                                                                notes: obj.notes,
                                                                                                created_at: obj.created_at
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