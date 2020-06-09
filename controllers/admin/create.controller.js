/**
*Admin create Controller
*/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin.model');
exports.createAdmin =  (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 8);
    const superAdminId = req.superAdminData.userId;
    const newAdmin = new Admin({
        user: req.body.user,
        password: hash,
        email: req.body.email,
        name: req.body.name,
        creator: superAdminId
    });
    newAdmin.save().then((result) => {
        const token = jwt.sign({id: result._id}, process.env.SECRET, {
            expiresIn: "1h"
        });
        return res.status(201).json({
            token: token,
            data: result,
            msg: "Successfully Created Admin",
            error:false
        })
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({error: true,status: 201, msg: "Admin Creation was Unsuccessful",err: err})
    })

}