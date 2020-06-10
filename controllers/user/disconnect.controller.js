
/**
 * Disconnect Vpn Controller
 */
const user = require('../../models/users.model');
exports.disConnectVpn =  (req, res, next) => {

    var newUser = {
        active: 0,
        updated_at: Date.now()
    };

    user.updateOne({username: req.body.username, password: req.body.password}, newUser)
        .then( result => {
            if(result.n > 0) {
                return res.status(201).json({
                    data: newUser,
                    msg: "Successfully Disconnected",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Disconnected Vpn"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Disconnected Vpn",err: err})
        })
}