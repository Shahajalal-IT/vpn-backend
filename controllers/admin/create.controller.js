/**
 * Admin create Controller
*/
const db = require("../../models");
const Admin = db.admin;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.createAdmin =  (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 8);
    const superAdminId = req.superAdminData.userId;
    const newAdmin = {
        user: req.body.user,
        password: hash,
        email: req.body.email,
        name: req.body.name,
        status: 1,
        site_name:req.body.site_name,
        site_title:req.body.site_title,
        creator: superAdminId
    };
    Admin.create(newAdmin).then((result) => {
        const token = jwt.sign({id: result.id,role:"admin"}, process.env.SECRET, {
            expiresIn: "1h"
        });
        return res.status(201).json({
            token: token,
            msg: "Successfully Created Admin",
            error:false
        })
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({error: true,status: 201, msg: "Admin Creation was Unsuccessful",err: err})
    })

}