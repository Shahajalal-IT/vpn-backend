/**
 * Add Balance To Reseller Controller
 */
const reseller = require('../../models/resellers.model');
exports.addBalanceReseller=  (req, res, next) => {

    reseller.findOne({_id: req.body.id})
        .then( reseller => {
            var balance = 0;
            if(reseller.hasOwnProperty('balance')){
                balance = +req.body.balance + reseller.balance;
            }else {
                balance = +req.body.balance;
            }
            return balance;
        }).then(balance => {
        var newReseller = {
            balance: balance,
            updated_at: Date.now()
        };
        reseller.updateOne({_id: req.body.id}, newReseller)
            .then( result => {
                if(result.n > 0) {
                    return res.status(201).json({
                        data: newReseller,
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