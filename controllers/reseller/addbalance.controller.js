/**
 * Add Balance To Reseller Controller
 */
const db = require("../../models");
const reseller = db.reseller;
const transaction = db.transaction;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.addBalanceReseller=  (req, res, next) => {
    const adminId = req.adminData.userId;
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    reseller.findByPk(decodedToken.reseller_id)
        .then( reseller => {
            balance = +decodedToken.amount + reseller.balance;
            return balance;
        }).then(balance => {
        var newReseller = {
            balance: balance
        };
        const transactionData = {
            given_by:adminId,
            given_by_type:'admin',
            given_to:decodedToken.reseller_id,
            previous_balance: balance - +decodedToken.amount,
            current_balance: balance,
            transaction_type: 1,
            admin_id: adminId
        }

        reseller.update(newReseller,{where:{id: decodedToken.reseller_id}})
            .then( result => {
                if(result > 0) {

                    transaction.create(transactionData).then(result => {
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