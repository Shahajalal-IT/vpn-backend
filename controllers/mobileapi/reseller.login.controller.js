/**
 * Reseller Login Controller
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const reseller = require("../../models/resellers.model");
exports.resellerLogin = (req, res, next) => {

    let fetchReseller;
    reseller.findOne({user: req.body.user, status:1})
        .then(user => {
            if(!user){
                return res.status(201).json(
                    {
                        error: true,
                        msg: "User Not Found Or Not Activated"
                    }
                );

            }
            fetchReseller = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if(!result){
                return res.status(201).json({
                    error: true,
                    msg: "Auth Failed"
                });
            }
            const token = jwt.sign({id: fetchReseller._id,role:"reseller"}, process.env.SECRET, {
                expiresIn: "72h"
            });
            return res.status(201).json({
                token: token,
                msg: "Successfully Log in Reseller",
                error:false
            })
        })
        .catch((err) => {
            return res.status(400).json({error: true,status: 400, msg: "Reseller Log in Unsuccessful",error: err})
        })
}