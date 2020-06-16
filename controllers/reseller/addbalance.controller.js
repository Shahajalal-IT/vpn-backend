/**
 * Add Balance To Reseller Controller
 */
const db = require("../../models");
const reseller = db.reseller;
const Op = db.Sequelize.Op;
exports.addBalanceReseller=  (req, res, next) => {

    reseller.findByPk(req.body.id)
        .then( reseller => {
            balance = +req.body.balance + reseller.balance;
            return balance;
        }).then(balance => {
        var newReseller = {
            balance: balance
        };
        reseller.update(newReseller,{where:{id: req.body.id}})
            .then( result => {
                if(result > 0) {
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