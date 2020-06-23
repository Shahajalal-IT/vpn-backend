/**
* Admin Login Controller
*/
const db = require("../../models");
const admin = db.admin;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminLogin = (req, res, next) => {

    const fetchedData = req.body.data;

    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    console.log(decodedToken);
    let fetchAdmin;
    admin.findOne({
        where:{user: decodedToken.user.username,status: 1}
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
            fetchAdmin = user;
            return bcrypt.compare(decodedToken.user.password, user.password);
        })
        .then(result => {
            if(!result){
                return res.status(201).json({
                    error: true,
                    msg: "Auth Failed"
                });
            }
            const token = jwt.sign({id: fetchAdmin.id,role:"admin"}, process.env.SECRET, {
                expiresIn: "1h"
            });
            return res.status(201).json({
                token: token,
                msg: "Successfully Log in Admin",
                error:false
            })
        })
        .catch((err) => {
            return res.status(400).json({error: true,status: 400, msg: "Admin Log in Unsuccessful",error: err})
        })
}