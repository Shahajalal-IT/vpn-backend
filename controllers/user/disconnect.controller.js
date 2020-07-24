
/**
 * Disconnect Vpn Controller
 */

const user = require("../../models/users.model");
exports.disConnectVpn =  (req, res, next) => {

    let main_str = req.query.pin;
    let splited_str = main_str.split('javed');
    const getuser = splited_str[0];
    const phone_unique = splited_str[1];
    const device = splited_str[2];

    var newUser = {
        active: 0,
    };

    user.updateOne({
        pin: getuser
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