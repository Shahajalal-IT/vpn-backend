
/**
 * Connect Vpn Using User Controller
 */

const user = require("../../models/users.model");
const reseller = require("../../models/resellers.model");
const reseller_transaction = require("../../models/reseller.transaction.model");
exports.connectVpnUsingPin =  (req, res, next) => {

    let main_str = req.query.pin;
    let splited_str = main_str.split('javed');
    const getuser = splited_str[0];
    const phone_unique = splited_str[1];
    const device = splited_str[2];

    user.findOne({
        pin: getuser
    })
        .then(user => {
            if(user === null){
                return res.send('');
            }

            if(device === '0'){
                if(user.device !== 'android'){
                    return res.send('');
                }
            }else{
                if(user.device !== 'ios'){
                    return res.send('');
                }
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
                            user_name: user.user,
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
                    phone_unique:phone_unique,
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
                    newUser.phone_unique = phone_unique
                }

                if(user.status === 0){
                    return res.send('');
                }

                if(user.phone_unique !=='' && user.phone_unique !== phone_unique){
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
                    pin: getuser
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
                pin: getuser
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