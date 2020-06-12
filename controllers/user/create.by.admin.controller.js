
/**
 * User create By Admin Controller------
 */
const jwt = require('jsonwebtoken');
const user = require('../../models/users.model');
const admin = require('../../models/admin.model');
exports.createUser =  (req, res, next) => {
    const adminId = req.adminData.userId;
    console.log(adminId);
    admin.findOne({_id: adminId})
        .then(user => {
            return user._id;
        }).then(admin => {
        const newUser = new user({
            pin: req.body.pin,
            username: req.body.username,
            password: req.body.password,
            type: req.body.type,
            active: 0,
            notes: req.body.notes,
            device: req.body.device,
            creator: admin,
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