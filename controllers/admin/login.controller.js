/**
* Admin Login Controller
*/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../../models/admin.model');

exports.adminLogin = (req, res, next) => {
    let fetchAdmin;
    admin.findOne({user: req.body.user})
        .then(user => {
            if(!user){
                return res.status(201).json(
                    {
                        error: true,
                        msg: "User Not Found"
                    }
                );

            }
            fetchAdmin = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if(!result){
                return res.status(201).json({
                    error: true,
                    msg: "Auth Failed"
                });
            }
            const token = jwt.sign({id: fetchAdmin._id}, process.env.SECRET, {
                expiresIn: "1h"
            });
            return res.status(201).json({
                admin: fetchAdmin,
                token: token,
                data: result,
                msg: "Successfully Log in Admin",
                error:false
            })
        })
        .catch((err) => {
            return res.status(400).json({error: true,status: 400, msg: "Admin Log in Unsuccessful",error: err})
        })
}