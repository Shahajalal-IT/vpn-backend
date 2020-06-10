
/**
 * User create Controller------
 */
const jwt = require('jsonwebtoken');
const user = require('../../models/users.model');
const reseller = require('../../models/resellers.model');
exports.createUser =  (req, res, next) => {
    const resellerId = req.resellerData.userId;
    reseller.findOne({_id: resellerId})
        .then(user => {
            return user.creator;
        }).then(admin => {
        const newUser = new user({
            pin: req.body.pin,
            username: req.body.username,
            password: req.body.password,
            type: req.body.type,
            active: 0,
            notes: req.body.notes,
            device: req.body.device,
            creator: resellerId,
            admin_id: admin
        });
        newUser.save().then((result) => {
            const token = jwt.sign({id: result._id}, process.env.SECRET, {
                expiresIn: "1h"
            });
            return res.status(201).json({
                token: token,
                data: result,
                msg: "Successfully Created User",
                error:false
            })
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "User Creation was Unsuccessful",err: err})
        });
    });
}