
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
        randonPin.add(decodedToken.username_prefix+randomstring.generate(6))
    }
    let sendData = [];
    reseller.findById(resellerId).then(resellerResult => {

        let i = 0;
        for (const value of randonPin.values()) {
            const pass = randomstring.generate(6);
            const newUser = new user({
                pin: value,
                user: value,
                password: pass,
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
            sendData.push(newUser);
            newUser.save().then(result => {
                i++;
                if(i === randonPin.size){
                    return res.status(201).json({
                        msg: `Successfully Created `+ i +` Users`,
                        error:false,
                        data:sendData
                    })
                }
            }).catch(error => {
                return res.status(400).json({error: true,status: 201, msg: "User Creation unsuccessful",err: error})
            })
        }
    })


}

