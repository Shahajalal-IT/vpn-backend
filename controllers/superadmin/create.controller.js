/**
 * Super Admin create Controller
*/
const db = require("../../models");
const superAdmin = db.superadmin;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.createsuperAdmin =  (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 8);
    const newsuperAdmin = {
        user: req.body.user,
        password: hash,
        email: req.body.email
    };

    superAdmin.create(newsuperAdmin)
        .then((result) => {
            const token = jwt.sign({id: result.id}, process.env.SECRET, {
                expiresIn: "1h"
            });
            return res.status(201).json({
                token: token,
                data: result,
                msg: "Successfully Created superAdmin",
                error:false
            })
        }).catch((err) => {
        console.log(err);
        return res.status(400).json({error: true,status: 201, msg: "superAdmin Creation was Unsuccessful",err: err})
    })

}