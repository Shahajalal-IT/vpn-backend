/**
 * Get All Transaction Controller
 */

const transaction = require("../../models/transactions.model");
const reseller = require("../../models/resellers.model");
const jwt = require('jsonwebtoken');
exports.getAllTransaction = (req, res, next) => {
    const resellerId = req.resellerData.userId;
    var d = new Date();
    d.setHours(23,59,59,999);
    var ed = new Date();
    ed.setMonth(ed.getMonth() - 1);
    ed.setHours(0,0,0,0);

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

    let options = {};
    let query = {};
    if(req.body._id === ''){

        query = {
            given_by: resellerId,
            given_by_type:'reseller',
            created_at: {
                $gte:startDate,
                $lte:endDate
            }
        }

        options = {
            page: +req.body.page,
            limit: +req.body.pagesize,
            sort: {created_at: -1}
        }
    }else{

        query = {
            given_by: resellerId,
            given_to: req.body._id,
            given_by_type:'reseller',
            created_at: {
                $gte:startDate,
                $lte:endDate
            }
        }

        options = {
            page: +req.body.page,
            limit: +req.body.pagesize,
            sort: {created_at: -1}
        }
    }
    reseller.find({ creator: resellerId, role: 'sub_reseller'},{id:1,user:1})
        .then(
            resellers => {
                transaction.paginate(query,options)
                    .then(
                        documents => {

                            if (documents.totalDocs === 0) {
                                res.status(200).json({
                                    data: [],
                                    msg: "No Data Available",
                                    pages:1,
                                    total:0,
                                    resellers: resellers,
                                    error: false
                                })
                            }
                            var finalDocuments = [];
                            var i = 0;
                            documents.docs.forEach(function (obj) {

                                reseller.findById(obj.given_to).then(result => {

                                    if (result === null) {

                                    } else {
                                        var newObj = {
                                            _id: obj._id,
                                            given_to: result.user,
                                            given_to_id: obj.given_to,
                                            previous_balance: obj.previous_balance,
                                            current_balance: obj.current_balance,
                                            transaction_type: obj.transaction_type,
                                            notes: obj.notes,
                                            created_at: obj.created_at
                                        };
                                        finalDocuments.push(newObj);


                                    }

                                    if (i === documents.docs.length - 1) {

                                        res.status(200).json({
                                            data: finalDocuments,
                                            msg: "Successfully Read Transaction Data",
                                            pages:documents.totalPages,
                                            total:documents.totalDocs,
                                            resellers: resellers,
                                            error: false
                                        })
                                    }

                                    i++;
                                })

                            });
                        }
                    )
            })
        .catch(error => {
            console.log(error)
            return res.status(400).json({error: true, msg: "Transaction Reading Was Unsuccessful",err: error})
        })
};