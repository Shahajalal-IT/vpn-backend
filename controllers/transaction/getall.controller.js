/**
 * Get All Transaction Controller
 */
const db = require("../../models");
const transaction = db.transaction;
const reseller = db.reseller;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.getAllTransaction = (req, res, next) => {
    const adminId = req.adminData.userId;
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
    let options = {};
    if(req.body.id === ''){
        options = {
            page: +req.body.page, // Default 1
            paginate: +req.body.pagesize, // Default 25
            order: [['id', 'DESC']],
            where: {
                given_by: adminId,
                given_by_type:'admin',
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        }
    }else{
        options = {
            page: +req.body.page, // Default 1
            paginate: +req.body.pagesize, // Default 25
            order: [['id', 'DESC']],
            where: {
                given_by: adminId,
                given_by_type:'admin',
                given_to:req.body.id,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        }
    }

    reseller.findAll({attributes: ['id', 'user']},{where:{creator: adminId }})
        .then(
            resellers => {

    transaction.paginate(options)
        .then(
            documents => {
                if(documents.total === 0){
                    res.status(200).json({
                        data: [],
                        msg: "No Data Available",
                        error: false
                    })
                }
                var finalDocuments = [];
                var i=0;
                documents.docs.forEach(function(obj) {

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

                            if (i === documents.docs.length - 1) {
                                res.status(200).json({
                                    data: finalDocuments,
                                    msg: "Successfully Read Transaction Data",
                                    pages:documents.pages,
                                    total:documents.total,
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