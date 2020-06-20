/**
 * Get All Transaction Controller
 */
const db = require("../../models");
const transaction = db.transaction;
const reseller = db.reseller;
const Op = db.Sequelize.Op;

exports.getAllTransaction = (req, res, next) => {
    const adminId = req.adminData.userId;
    transaction.findAll({where:{given_by: adminId }})
        .then(
            documents => {


                var finalDocuments = [];
                documents.forEach(function(obj,i) {

                        reseller.findByPk(obj.given_to).then(result => {
                            var newObj = {
                                id:obj.id,
                                given_to:result.user,
                                given_to_id:obj.given_to,
                                previous_balance:obj.previous_balance,
                                current_balance:obj.current_balance,
                                transaction_type:result.transaction_type,
                                notes:obj.notes,
                            };
                            finalDocuments.push(newObj);
                            if(i === documents.length-1){
                                res.status(200).json({
                                    data: finalDocuments,
                                    msg: "Successfully Read Transaction Data",
                                    error:false
                                })
                            }
                        })
                });
            }
        )
        .catch(error => {
            console.log(error)
            return res.status(400).json({error: true, msg: "Transaction Reading Was Unsuccessful",err: error})
        })
};