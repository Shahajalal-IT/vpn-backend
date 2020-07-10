
/**
 * Reseller create Controller------
 */

const reseller = require("../../models/resellers.model");
const transaction = require("../../models/transactions.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.createReseller =  (req, res, next) => {
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    const hash = bcrypt.hashSync(decodedToken.password, 8);
    const AdminId = req.adminData.userId;

    const newReseller = new reseller({
        user: decodedToken.username,
        password: hash,
        email: decodedToken.email,
        role: 'reseller',
        balance: decodedToken.balance,
        status: 1,
        ios_price: decodedToken.ios_price,
        android_price: decodedToken.android_price,
        creator: AdminId,
        admin_id: AdminId,

    });

    newReseller.save().then((result) => {
        const token = jwt.sign({id: result._id,role:"reseller"}, process.env.SECRET, {
            expiresIn: "1h"
        });

        const transactionData = new transaction({
            given_by:AdminId,
            given_by_type:'admin',
            given_to:result.id,
            previous_balance: 0,
            current_balance: decodedToken.balance,
            transaction_type: 1,
            admin_id: AdminId,
            notes:'Creating and First Transaction'
        });

        transactionData.save().then(result => {
            console.log('Successfully Created Transaction')
        });

        return res.status(201).json({
            token: token,
            msg: "Successfully Created Reseller",
            error:false
        })
    }).catch((err) => {
        return res.status(400).json({error: true,status: 201, msg: "Reseller Creation was Unsuccessful",err: err})
    })

}