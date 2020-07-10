/**
 * Super Admin create Controller
*/

const superAdmin = require("../../models/superadmin.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.createsuperAdmin =  (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 8);
    const newsuperAdmin = new superAdmin({
        user: req.body.user,
        password: hash,
        email: req.body.email
    });

    newsuperAdmin.save()
        .then((result) => {
            const token = jwt.sign({id: result._id,role:'super_admin'}, process.env.SECRET, {
                expiresIn: "1h"
            });
            return res.status(201).json({
                token: token,
                data: result,
                msg: "Successfully Created superAdmin",
                error:false
            })
        }).catch((err) => {
        return res.status(400).json({error: true,status: 201, msg: "superAdmin Creation was Unsuccessful",err: err})
    })

}