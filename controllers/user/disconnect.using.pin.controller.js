
/**
 * Disconnect Vpn Using Pin Controller
 */

const user = require("../../models/users.model");
const axios = require("axios");
exports.disConnectVpn =  (req, res, next) => {

    var newUser = {
        active: 0,
    };

    user.updateOne({
        pin: req.body.pin
    },newUser)
        .then( result => {

            if(result.n > 0) {

                axios.post('http://fontend.trytorun.xyz:3900/api/server/change-connected-user', {
                    action: 0,
                    id:req.body.id
                });

                return res.status(201).json({
                    msg: "Successfully Disconnected",
                    error:false
                });
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Disconnected Vpn"})
            }
        })
        .catch((err) => {

            return res.status(400).json({error: true,status: 201, msg: "Problem in Disconnected Vpn",err: err})
        })
}