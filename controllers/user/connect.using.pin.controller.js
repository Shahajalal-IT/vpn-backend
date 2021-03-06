
/**
 * Connect Vpn Using Pin Controller
 */

const user = require("../../models/users.model");
const reseller = require("../../models/resellers.model");
const reseller_transaction = require("../../models/reseller.transaction.model");
const axios = require("axios");
exports.connectVpnUsingPin =  (req, res, next) => {

    user.findOne({
            pin: req.body.pin
    })
        .then(user => {
            if(user === null){
                return res.status(201).json({
                    msg: "invalid Pin",
                    error:true
                })
            }
            var newUser;
            var expired_at;
            var today = new Date();
            if(user.type === 1){
                expired_at = today.setMonth(today.getMonth() + 1);
                expired_at = new Date(expired_at);
            }else{
                expired_at = today.setDate(today.getDate() + 1);
                expired_at = new Date(expired_at);
            }


            if(user.activated_at === undefined){
                if(user.creator_type === 'reseller'){
                    reseller.findById(user.creator).then(result => {
                        var newBalance = +result.balance - 1;
                        var newRes = {};
                        let due;

                        if(user.device === 'android'){
                            due = +result.due + +result.android_price
                            newRes = {
                                balance: newBalance,
                                due: due
                            }
                        }else{
                            due = +result.due + +result.ios_price
                            newRes = {
                                balance: newBalance,
                                due: due
                            }
                        }

                        var resellerTransaction = new reseller_transaction({
                            reseller_id: result._id,
                            reseller_name: result.user,
                            pin: user.pin,
                            creator: result.creator,
                            user_id: user._id,
                            p_balance: +result.balance,
                            c_balance: newBalance,
                            p_due: +result.due,
                            c_due: due,
                            price: user.device === 'android'?result.android_price:result.ios_price,
                            admin_id: result.admin_id
                        });

                        reseller.updateOne({
                            _id: result._id
                        },newRes).then(resu => {

                            resellerTransaction.save().then(res_t=>{
                                console.log('Balance Cut Successfully');
                            })
                        })
                    })
                }

                newUser = {
                    activated_at: Date.now(),
                    expired_at: expired_at,
                    phone_unique:req.body.phone_unique,
                    active: 1,
                    status: 1

                };
            }else {

                newUser = {
                    activated_at: user.activated_at,
                    expired_at: user.expired_at,
                    active: 1,
                };

                if(user.phone_unique === ''){
                    newUser.phone_unique = req.body.phone_unique
                }

                if(user.status === 0){
                    return res.status(201).json({
                        msg: "User Not Activated",
                        error:true
                    })
                }

                if(user.phone_unique !=='' && user.phone_unique !== req.body.phone_unique){
                    return res.status(201).json({
                        msg: "Already Used In Another Device",
                        error:true
                    })
                }
            }

            return newUser;
        }).then(new_user => {
        if(new_user.expired_at < Date.now()){

            let expiredUser = {
                status: 3
            };

            user.updateOne(
                {
                    pin: req.body.pin
                },expiredUser).then(resultsexp => {
                    if(resultsexp.n > 0){
                        console.log(resultsexp)
                    }
            }).catch(exerror => {
                console.log(exerror);
            })

            return res.status(400).json({
                msg: "Date Expired",
                error:true
            })
        }
        user.updateOne(
            {
                pin: req.body.pin
            },new_user)
            .then( result => {
                if(result.n > 0) {

                    axios.post('http://fontend.trytorun.xyz:3900/api/server/change-connected-user', {
                        action: 1,
                        id:req.body.id
                    });

                    return res.status(201).json({
                        msg: "Successfully Connected",
                        expired_date:new_user.expired_at.toLocaleDateString(),
                        error:false
                    })
                }else {
                    return res.status(400).json({error: true,status: 201, msg: "Problem in Connecting Vpn"})
                }
            })
            .catch((err) => {
                console.log(err)
                return res.status(400).json({error: true,status: 201, msg: "Problem in Connecting Vpn",err: err})
            })
    })
}