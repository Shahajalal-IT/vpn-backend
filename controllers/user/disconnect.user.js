
/**
 * Disconnect Vpn Controller
 */

const user = require("../../models/users.model");
exports.disConnectVpn =  (req, res, next) => {

    var newUser = {
        active: 0,
    };

    user.updateOne({
        user: req.query.user
    },newUser)
        .then( result => {

            if(result.n > 0) {
                return res.send('Ok');
            }else {
                return res.send('');
            }
        })
        .catch((err) => {

            return res.send('');
        })
}