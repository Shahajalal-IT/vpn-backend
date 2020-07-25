
/**
 * User create By Admin Controller------
 */

const user = require("../../models/users.model");
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const sortJsonArray = require('sort-json-array');
exports.createUser =  (req, res, next) => {
    const adminId = req.adminData.userId;
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    const randonPin = new Set()

    while (randonPin.size < +decodedToken.no_of_account) {
        randonPin.add(decodedToken.username_prefix+parseInt(Date.now() * Math.random()))
    }

    let sendData = [];
    let i = 0;
    for (const value of randonPin.values()) {

        const newUser = new user({
            pin: value,
            type: decodedToken.duration,
            active: 0,
            status: 0,
            notes: decodedToken.notes,
            device: decodedToken.device,
            creator: adminId,
            onModel:'admins',
            creator_type: 'admin',
            admin_id: adminId
        });

        newUser.save().then(result => {
            i++;
            let nData = {
                serial: result.serial,
                pin: result.pin,
            };
            sendData.push(nData);

            if(i === randonPin.size){

                return res.status(201).json({
                    msg: `Successfully Created `+ i +` Users`,
                    error:false,
                    data:sortJsonArray(sendData, 'serial','asc')
                })
            }
        }).catch(error => {
            console.log(error);
            return res.status(400).json({error: true,status: 400, msg: "Bulk User Creation Unsuccessful",error: error})
        })

    }

}

