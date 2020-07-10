/**
 * Add Balance To Reseller Controller
 */

const reseller = require("../../models/resellers.model");
const transaction = require("../../models/transactions.model");
const jwt = require('jsonwebtoken');
exports.addBalanceReseller=  (req, res, next) => {
    const adminId = req.adminData.userId;
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    reseller.findById(decodedToken.reseller_id)
        .then( reseller => {
            balance = +decodedToken.amount + reseller.balance;
            return balance;
        }).then(balance => {
        var newReseller = {
            balance: balance
        };
        const transactionData = new transaction({
            given_by:adminId,
            given_by_type:'admin',
            given_to:decodedToken.reseller_id,
            previous_balance: balance - +decodedToken.amount,
            current_balance: balance,
            transaction_type: 1,
            admin_id: adminId,
            notes:decodedToken.notes
        });

        reseller.updateOne({_id: decodedToken.reseller_id},newReseller)
            .then( result => {
                if(result.n > 0) {

                    transactionData.save().then(result => {
                        console.log('Successfully Created Transaction')
                    });

                    return res.status(201).json({
                        msg: "Successfully Added Balance",
                        error:false
                    })
                }else {
                    return res.status(400).json({error: true,status: 201, msg: "Problem in Adding Balance"})
                }
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({error: true,status: 201, msg: "Problem in Adding Balance",err: err})
            })

    });
}