/**
 * Add Balance To SubReseller Controller
 */
const db = require("../../models");
const reseller = db.reseller;
const transaction = db.transaction;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.addBalanceReseller=  (req, res, next) => {
    const resellerId = req.resellerData.userId;
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    reseller.findByPk(resellerId).then(fatherReseller => {
        var fatherbalance = fatherReseller.balance - +decodedToken.amount;

        var fatherUpdateData = {
            balance: fatherbalance
        }

        if(fatherbalance < 0){
            return res.status(400).json({error: true,status: 201, msg: "Not Succificient Balance"})
        }

        reseller.findByPk(decodedToken.reseller_id)
        .then( reseller => {
            balance = +decodedToken.amount + reseller.balance;
            return balance;
        }).then(balance => {
        var newReseller = {
            balance: balance
        };
        const transactionData = {
            given_by:resellerId,
            given_by_type:'reseller',
            given_to:decodedToken.reseller_id,
            previous_balance: balance - +decodedToken.amount,
            current_balance: balance,
            transaction_type: 1,
            admin_id: reseller.admin_id,
            notes:decodedToken.notes
        }

        reseller.update(newReseller,{where:{id: decodedToken.reseller_id}})
            .then( result => {
                if(result > 0) {

                    transaction.create(transactionData).then(result => {
                        console.log('Successfully Created Transaction')
                    });

                    reseller.update(fatherUpdateData,{where:{id:resellerId}}).then(result => {
                        console.log('Reseller balance cut successfully')
                    })

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

    })
}