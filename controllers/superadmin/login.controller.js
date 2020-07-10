/**
 * Super Admin Login Controller
 */

const superAdmin = require("../../models/superadmin.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.superAdminLogin = (req, res, next) => {
    let fetchSuperAdmin;
    superAdmin.findOne({
        user: req.body.user
    })
        .then(user => {
            if(!user){
                return res.status(201).json(
                    {
                        error: true,
                        msg: "User Not Found"
                    }
                );
            }
            fetchSuperAdmin = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if(!result){
                return res.status(201).json({
                    error: true,
                    msg: "Auth Failed"
                });
            }

            const token = jwt.sign({id: fetchSuperAdmin._id,role:'super_admin'}, process.env.SECRET, {
                expiresIn: "1h"
            });
            return res.status(201).json({
                token: token,
                msg: "Successfully Log in SuperAdmin",
                error:false
            })
        })
        .catch((err) => {
            return res.status(400).json({error: true,status: 400, msg: "SuperAdmin Login Unsuccessful",error: err})
        })
}