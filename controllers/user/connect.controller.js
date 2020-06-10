
/**
 * Connect Vpn Controller
 */
const user = require('../../models/users.model');
exports.connectVpn =  (req, res, next) => {

    user.findOne({username: req.body.username, password: req.body.password})
        .then(user => {
            var newUser;
            var expired_at;
            for(var i=0;i<=5;i++){
                if(user.type === i){
                    var today = new Date();
                    expired_at = today.setMonth(today.getMonth() + (++i));
                }
            }
            if(user.activated_at === undefined){
                newUser = {
                    user: user,
                    activated_at: Date.now(),
                    expired_at: expired_at,
                    active: 1,
                    updated_at: Date.now()
                };
            }else {
                newUser = {
                    user: user,
                    active: 1,
                    updated_at: Date.now()
                };
            }
            return newUser;
        }).then(new_user => {
            if(new_user.user.expired_at < Date.now()){
                return res.status(201).json({
                    msg: "Date Expired",
                    error:true
                })
            }
        user.updateOne({username: req.body.username, password: req.body.password}, new_user)
            .then( result => {
                if(result.n > 0) {
                    return res.status(201).json({
                        data: new_user,
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