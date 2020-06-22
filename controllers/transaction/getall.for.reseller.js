/**
 * Get All Transaction Controller
 */
const db = require("../../models");
const transaction = db.transaction;
const reseller = db.reseller;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.getAllTransaction = (req, res, next) => {
    const resellerId = req.resellerData.userId;
    // const fetchedData = req.body.data;
    // const decodedToken = jwt.verify(
    //     fetchedData,
    //     process.env.SECRET
    // );
    var d = new Date();
    var ed = new Date();
    d.setMonth(d.getMonth() - 1);

    var decodedToken = {
        startDate:'',
        endDate:''
    }
    var startDate =decodedToken.startDate === '' ? d:decodedToken.startDate;
    var endDate = decodedToken.endDate === '' ? ed:decodedToken.endDate;
    var where = {
        given_by: resellerId,
        createdAt: {
            [Op.between]: [startDate, endDate]
        }
    };

    transaction.findAll({where:where})
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
                            createdAt: obj.createdAt
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