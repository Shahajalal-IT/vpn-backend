
/**
 * Disconnect Vpn Using Pin Controller
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;
exports.disConnectVpn =  (req, res, next) => {

    var newUser = {
        active: 0,
    };

    user.update(newUser,{
        where:{pin: req.body.pin}
    })
        .then( result => {
            if(result > 0) {
                return res.status(201).json({
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