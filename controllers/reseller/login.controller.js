/**
 * Reseller Login Controller
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const reseller = require('../../models/resellers.model');

exports.resellerLogin = (req, res, next) => {
    let fetchReseller;
    reseller.findOne({user: req.body.user})
        .then(user => {
            if(!user){
                return res.status(201).json(
                    {
                        error: true,
                        msg: "User Not Found"
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
            const token = jwt.sign({id: fetchReseller._id}, process.env.SECRET, {
                expiresIn: "1h"
            });
            return res.status(201).json({
                reseller: fetchReseller,
                token: token,
                data: result,
                msg: "Successfully Log in Reseller",
                error:false
            })
        })
        .catch((err) => {
            return res.status(400).json({error: true,status: 400, msg: "Reseller Log in Unsuccessful",error: err})
        })
}