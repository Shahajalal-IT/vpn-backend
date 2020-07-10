/**
 * Admin create Controller
*/

const Admin = require("../../models/admin.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAdmin =  (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 8);
    const superAdminId = req.superAdminData.userId;
    const newAdmin = new Admin({
        user: req.body.user,
        password: hash,
        email: req.body.email,
        name: req.body.name,
        status: 1,
        site_name:req.body.site_name,
        site_title:req.body.site_title,
        creator: superAdminId
    });
    newAdmin.save().then( result => {
        const token = jwt.sign({id: result._id,role:"admin"}, process.env.SECRET, {
            expiresIn: "1h"
        });
        return res.status(201).json({
            token: token,
            msg: "Successfully Created Admin",
            error:false
        })
    }).catch((err) => {

        return res.status(400).json({error: true,status: 201, msg: "Admin Creation was Unsuccessful",err: err})
    })

}