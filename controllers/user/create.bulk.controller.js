
/**
 * Bulk User create By Reseller Controller------
 */

const user = require("../../models/users.model");
const reseller = require("../../models/resellers.model");
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring')
exports.createUser =  (req, res, next) => {
    const resellerId = req.resellerData.userId;

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    const randonPin = new Set()

    while (randonPin.size < +decodedToken.no_of_account) {
        randonPin.add(decodedToken.username_prefix+randomstring.generate({ length: 5, charset: 'numeric'}))
    }
    let sendData = [];
    reseller.findById(resellerId).then(resellerResult => {

        let i = 0;
        for (const value of randonPin.values()) {

            const newUser = new user({
                pin: value,
                type: decodedToken.duration,
                active: 0,
                status: 0,
                notes: decodedToken.notes,
                device: decodedToken.device,
                creator: resellerId,
                onModel:'resellers',
                creator_type: 'reseller',
                admin_id: resellerResult.admin_id
            });

            newUser.save().then(result => {
                i++;
                let nData = {
                    pin: result.pin,
                    serial: result.serial
                };
                sendData.push(nData);

                if(i === randonPin.size){
                    return res.status(201).json({
                        msg: `Successfully Created `+ i +` Users`,
                        error:false,
                        data:sendData
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        }
    })


}

