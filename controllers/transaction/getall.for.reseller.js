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
    d.setHours(0,0,0,0);
    var ed = new Date();
    ed.setMonth(ed.getMonth() - 1);
    ed.setHours(23,59,59,999);

    var startDate,endDate;
    if(req.body.startDate === ''){
        startDate = ed;
    }else{
        startDate = new Date(req.body.startDate);
        startDate.setHours(0,0,0,0);
    }

    if(req.body.endDate === ''){
        endDate = d;
    }else{
        endDate = new Date(req.body.endDate);
        endDate.setHours(23,59,59,999);
    }

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

                if(documents.length === 0){
                    res.status(200).json({
                        data: [],
                        msg: "No Data Available",
                        error: false
                    })
                }
                var finalDocuments = [];
                var i=0;
                documents.forEach(function(obj) {

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

                        }


                        if (i === documents.length - 1) {
                            res.status(200).json({
                                data: finalDocuments,
                                msg: "Successfully Read Transaction Data",
                                error: false
                            })
                        }

                        i++;
                    })

                });
            }
        )
        .catch(error => {
            console.log(error)
            return res.status(400).json({error: true, msg: "Transaction Reading Was Unsuccessful",err: error})
        })
};