/**
 * Cut balance from Sub Reseller Controller
 */

const reseller = require("../../models/resellers.model");
const transaction = require("../../models/transactions.model");
const jwt = require('jsonwebtoken');
exports.cutBalanceReseller=  (req, res, next) => {
    const resellerId = req.resellerData.userId;

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    reseller.findById(resellerId).then(fatherReseller => {
        var fatherbalance = fatherReseller.balance + +decodedToken.amount;

        var fatherUpdateData = {
            balance: fatherbalance
        }

    reseller.findById(decodedToken.reseller_id)
        .then( reseller => {
            if(reseller.balance <= 0 || +decodedToken.amount > reseller.balance){
                return res.status(201).json({
                    msg: "Not sufficient Balance",
                    error:true
                })
            }
            balance = reseller.balance - +decodedToken.amount ;
            return balance;
        }).then(balance => {
        var newReseller = {
            balance: balance
        };

        const transactionData = new transaction({
            given_by:resellerId,
            given_by_type:'reseller',
            given_to:decodedToken.reseller_id,
            previous_balance: balance + +decodedToken.amount,
            current_balance: balance,
            transaction_type: 2,
            admin_id: reseller.admin_id,
            notes:decodedToken.notes
        });

        reseller.updateOne({_id: decodedToken.reseller_id},newReseller)
            .then( result => {
                if(result.n > 0) {
                    transactionData.save().then(result => {
                        console.log('Successfully Created Transaction')
                    });
                    reseller.updateOne({_id:resellerId},fatherUpdateData).then(result => {
                        console.log('Reseller balance cut successfully')
                    })
                    return res.status(201).json({
                        msg: "Successfully Cut Balance",
                        error:false
                    })
                }else {
                    return res.status(400).json({error: true,status: 201, msg: "Problem in Cutting Balance"})
                }
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({error: true,status: 201, msg: "Problem in Cutting Balance",err: err})
            })

    });
    })
}