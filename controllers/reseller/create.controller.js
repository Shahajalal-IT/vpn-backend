
/**
 * Reseller create Controller------
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const reseller = require('../../models/resellers.model');
exports.createReseller =  (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 8);
    const AdminId = req.adminData.userId;
    const newReseller = new reseller({
        user: req.body.user,
        password: hash,
        email: req.body.email,
        name: req.body.name,
        creator: AdminId
    });
    newReseller.save().then((result) => {
        const token = jwt.sign({id: result._id}, process.env.SECRET, {
            expiresIn: "1h"
        });
        return res.status(201).json({
            token: token,
            data: result,
            msg: "Successfully Created Reseller",
            error:false
        })
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({error: true,status: 201, msg: "Reseller Creation was Unsuccessful",err: err})
    })

}