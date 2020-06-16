
/**
 * Reseller create Controller------
 */
const db = require("../../models");
const reseller = db.reseller;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.createReseller =  (req, res, next) => {
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    console.log(decodedToken);

    const hash = bcrypt.hashSync(decodedToken.password, 8);
    const AdminId = req.adminData.userId;

    const newReseller = {
        user: decodedToken.username,
        password: hash,
        email: decodedToken.email,
        role: 'reseller',
        balance: decodedToken.balance,
        ios_price: decodedToken.ios_price,
        android_price: decodedToken.android_price,
        creator: AdminId,
        admin_id: AdminId
    };
    reseller.create(newReseller).then((result) => {
        const token = jwt.sign({id: result.id}, process.env.SECRET, {
            expiresIn: "1h"
        });

        return res.status(201).json({
            token: token,
            msg: "Successfully Created Reseller",
            error:false
        })
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({error: true,status: 201, msg: "Reseller Creation was Unsuccessful",err: err})
    })

}