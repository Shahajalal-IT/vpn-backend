
/**
 * Bulk User create By Reseller Controller------
 */

const user = require("../../models/users.model");
const reseller = require("../../models/resellers.model");
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const sortJsonArray = require('sort-json-array');
exports.createUser =  (req, res, next) => {
    const resellerId = req.resellerData.userId;

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    if(+decodedToken.no_of_account > 100){
        return res.status(201).json({
            msg: `Your Bulk User Creation Limit is 100`,
            error:true,
        })
    }

    const randonPin = new Set()

    while (randonPin.size < +decodedToken.no_of_account) {
        randonPin.add(decodedToken.username_prefix+randomstring.generate({ length: 7, charset: 'numeric'}))
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
                    serial: result.serial,
                    pin: result.pin,

                };
                sendData.push(nData);

                if(i === randonPin.size){

                    sendData.sort(function (a, b) {
                        if (a.serial < b.serial)
                            return -1;
                        if (a.serial > b.serial)
                            return 1;
                        return 0;
                    })

                    return res.status(201).json({
                        msg: `Successfully Created `+ i +` Users`,
                        error:false,
                        data:sendData
                    })
                }
            }).catch(error => {
                console.log(error)
                return res.status(400).json({error: true,status: 400, msg: "Bulk User Creation Unsuccessful",error: error})
            })
        }
    })


}

