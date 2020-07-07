
/**
 * Connect Vpn Controller
 */
const db = require("../../models");
const user = db.user;
const reseller = db.reseller;
const reseller_transaction = db.reseller_transaction;
const Op = db.Sequelize.Op;
const axios = require("axios");
exports.connectVpn =  (req, res, next) => {

    user.findOne({
        where:{
            user: req.body.user,
            password: req.body.password
        }
    })
        .then(user => {
            var newUser;
            var expired_at;
            for(var i=1;i<=12;i++){
                if(user.type === i){
                    var today = new Date();
                    expired_at = today.setMonth(today.getMonth() + i);
                    expired_at = new Date(expired_at);
                }
            }
            if(user.activated_at === null){

                if(user.creator_type === 'reseller'){
                    reseller.findByPk(user.creator).then(result => {
                        var newBalance = +result.balance - 1;
                        var newRes = {
                            balance: newBalance
                        }

                        var resellerTransaction = {
                            reseller_id: result.id,
                            user_id:user.id,
                            p_balance:+result.balance,
                            c_balance:newBalance,
                            price:user.device === 'android'?result.android_price:result.ios_price,
                            admin_id:result.admin_id
                        }

                        reseller.update(newRes,{
                            where:{id: result.id}
                        }).then(resu => {
                            reseller_transaction.create(resellerTransaction).then(res_t=>{
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

                if(user.phone_unique ===''){
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
            return res.status(201).json({
                msg: "Date Expired",
                error:true
            })
        }


        user.update(new_user,
            {
                where:{user: req.body.user, password: req.body.password}
            })
            .then( result => {
                if(result > 0) {


                    axios.post('http://fontend.trytorun.xyz:3900/api/server/change-connected-user', {
                        action: 1,
                        id:req.body.id
                    })

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
                console.log(err);
                return res.status(400).json({error: true,status: 201, msg: "Problem in Connecting Vpn",err: err})
            })
    })
}