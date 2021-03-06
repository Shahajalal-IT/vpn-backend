
/**
 * Connect Vpn Using User Controller
 */

const user = require("../../models/users.model");
const reseller = require("../../models/resellers.model");
const reseller_transaction = require("../../models/reseller.transaction.model");
exports.connectVpnUsingPin =  (req, res, next) => {

    user.findOne({
        pin: req.query.pin
    })
        .then(user => {
            if(user === null){
                return res.send('');
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
                    active: 1,
                    status: 1

                };
            }else {

                newUser = {
                    activated_at: user.activated_at,
                    expired_at: user.expired_at,
                    active: 1,
                };

                if(user.status === 0){
                    return res.send('');
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
                    pin: req.query.user
                },expiredUser).then(resultsexp => {
                if(resultsexp.n > 0){
                    console.log(resultsexp)
                }
            }).catch(exerror => {
                console.log(exerror);
            })

            return res.send('');
        }
        user.updateOne(
            {
                pin: req.query.user
            },new_user)
            .then( result => {
                if(result.n > 0) {

                    return res.send('Ok');
                }else {
                    return res.send('');
                }
            })

    }).catch((err) => {
        console.log(err)
        return res.send('');
    })
}