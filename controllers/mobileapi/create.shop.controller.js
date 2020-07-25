
/**
 * SubReseller create Controller------
 */

const reseller = require("../../models/resellers.model");
const transaction = require("../../models/transactions.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.createReseller =  (req, res, next) => {

    const hash = bcrypt.hashSync(req.body.password, 8);
    const ResellerId = req.resellerData.userId;

    reseller.findById(ResellerId).then(resellerResult => {

        var fatherbalance = +resellerResult.balance - +req.body.balance;

        var fatherUpdateData = {
            balance: fatherbalance
        }

        if(fatherbalance < 0){
            return res.status(400).json({error: true,status: 201, msg: "Not Succificient Balance"})
        }

        const newReseller = new reseller({
            user: req.body.username,
            password: hash,
            email: req.body.email,
            role: 'sub_reseller',
            balance: req.body.balance,
            due: 0,
            status: 1,
            ios_price: req.body.ios_price,
            android_price: req.body.android_price,
            creator: ResellerId,
            onModel:'resellers',
            admin_id: resellerResult.admin_id,

        });

        newReseller.save().then((result) => {
            const token = jwt.sign({id: result._id}, process.env.SECRET, {
                expiresIn: "1h"
            });

            const transactionData = new transaction({
                given_by:ResellerId,
                given_by_type:'reseller',
                given_to:result.id,
                previous_balance: 0,
                current_balance: req.body.balance,
                transaction_type: 1,
                admin_id: resellerResult.admin_id,
                notes:'Creating and First Transaction'
            });

            transactionData.save().then(result => {
                console.log('Successfully Created Transaction')
            });

            reseller.updateOne({_id:ResellerId},fatherUpdateData).then(result => {
                console.log('Reseller balance cut successfully')
            })

            return res.status(201).json({
                token: token,
                msg: "Successfully Created Shop",
                error:false
            })
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Reseller Creation was Unsuccessful",err: err})
        })


    })



}