
/**
 * Disconnect Vpn Controller
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;
const axios = require("axios");
exports.disConnectVpn =  (req, res, next) => {

    var newUser = {
        active: 0,
    };

    user.update(newUser,{
        where:{user: req.body.user, password: req.body.password}
    })
        .then( result => {

            axios.post('http://fontend.trytorun.xyz:3900/api/server/change-connected-user', {
                action: 0,
                id:req.body.id
            })

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