/**
 * Add Balance To Reseller Controller
 */
const db = require("../../models");
const reseller = db.reseller;
const transaction = db.transaction;
const Op = db.Sequelize.Op;
exports.cutBalanceReseller=  (req, res, next) => {
    const adminId = req.adminData.userId;
    reseller.findByPk(req.body.id)
        .then( reseller => {
            if(reseller.balance <= 0 || +req.body.balance > reseller.balance){
                return res.status(201).json({
                    msg: "Not sufficient Balance",
                    error:true
                })
            }
            balance = reseller.balance - +req.body.balance ;
            return balance;
        }).then(balance => {
        var newReseller = {
            balance: balance
        };

        const transactionData = {
            given_by:adminId,
            given_by_type:'admin',
            given_to:req.body.id,
            previous_balance: balance + +req.body.balance,
            current_balance: balance,
            transaction_type: 2,
            admin_id: adminId
        }
        transaction.create(transactionData).then(result => {
            console.log('Successfully Created Transaction')
        });

        reseller.update(newReseller,{where:{id: req.body.id}})
            .then( result => {
                if(result > 0) {
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
}