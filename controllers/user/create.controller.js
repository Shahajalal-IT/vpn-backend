
/**
 * User create By Reseller Controller------
 */

const user = require("../../models/users.model");
const reseller = require("../../models/resellers.model");
const jwt = require('jsonwebtoken');

exports.createUser =  (req, res, next) => {
    const resellerId = req.resellerData.userId;
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    reseller.findById(resellerId).then(result => {
        const newUser = new user({
            pin: decodedToken.pin,
            user: decodedToken.username,
            password: decodedToken.password,
            type: decodedToken.duration,
            active: 0,
            status: 0,
            notes: decodedToken.notes,
            device: decodedToken.device,
            creator: resellerId,
            onModel:'resellers',
            creator_type: 'reseller',
            admin_id: result.admin_id
        });
        newUser.save().then((result) => {
            if(result){
                return res.status(201).json({
                    msg: "Successfully Created User",
                    error:false
                })
            }else{
                return res.status(400).json({error: true,status: 201, msg: "User Creation was Unsuccessful",err: err})
            }

        }).catch((err) => {

            return res.status(400).json({error: true,status: 201, msg: "User Creation was Unsuccessful",err: err})
        });
    })

}