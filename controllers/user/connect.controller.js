
/**
 * Connect Vpn Controller
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;
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
                }
            }
            if(user.activated_at === null){
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
                    return res.status(201).json({
                        msg: "Successfully Connected",
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