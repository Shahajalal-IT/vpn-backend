/**
 * Get All Transaction Controller
 */
const db = require("../../models");
const transaction = db.transaction;
const reseller = db.reseller;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const moment = require('moment');
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

    //var startOfDay = ;
    //var endOfDay = ;
    // console.log(startOfDay);
    // console.log(endOfDay);
    var startDate =req.body.startDate === '' ? d:moment(req.body.startDate, "YYYY-MM-DD").startOf('day').fromNow();
    var endDate = req.body.endDate === '' ? ed:moment(req.body.endDate, "YYYY-MM-DD").endOf('day').fromNow();
    var where = {
        given_by: resellerId,
        createdAt: {
            [Op.between]: [startDate, endDate]
        },
        given_by_type:'reseller'
    };

    transaction.findAll({where:where})
        .then(
            documents => {
                var finalDocuments = [];
                documents.forEach(function(obj,i) {

                    reseller.findByPk(obj.given_to).then(result => {

                        if(result === null){

                        }else {

                            var newObj = {
                                id: obj.id,
                                given_to: result.user,
                                given_to_id: obj.given_to,
                                previous_balance: obj.previous_balance,
                                current_balance: obj.current_balance,
                                transaction_type: result.transaction_type,
                                notes: obj.notes,
                                createdAt: obj.createdAt
                            };
                            finalDocuments.push(newObj);
                            if (i === documents.length - 1) {
                                res.status(200).json({
                                    data: finalDocuments,
                                    msg: "Successfully Read Transaction Data",
                                    error: false
                                })
                            }
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