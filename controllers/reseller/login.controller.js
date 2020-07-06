/**
 * Reseller Login Controller
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../../models");
const reseller = db.reseller;
const Op = db.Sequelize.Op;
exports.resellerLogin = (req, res, next) => {

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    let fetchReseller;
    reseller.findOne({where:{user: decodedToken.user.username, status:1}})
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
            return bcrypt.compare(decodedToken.user.password, user.password);
        })
        .then(result => {
            if(!result){
                return res.status(201).json({
                    error: true,
                    msg: "Auth Failed"
                });
            }
            const token = jwt.sign({id: fetchReseller.id,role:"reseller"}, process.env.SECRET, {
                expiresIn: "1h"
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