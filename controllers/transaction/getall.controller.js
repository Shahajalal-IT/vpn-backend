/**
 * Get All Transaction Controller
 */

const transaction = require("../../models/transactions.model");
const reseller = require("../../models/resellers.model");
const jwt = require('jsonwebtoken');
exports.getAllTransaction = (req, res, next) => {
    const adminId = req.adminData.userId;
    var d = new Date();
    d.setDate(d.getDate() + 1);
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
            given_by: adminId,
            given_by_type:'admin',
            created_at: {
                $gte:startDate,
                $lte:endDate
            }
        }

        options = {
            page: +req.body.page,
            limit: +req.body.pagesize,
            sort: {created_at: -1},
            populate:'given_to'
        }
    }else{

        query = {
            given_by: adminId,
            given_by_type:'admin',
            given_to:req.body._id,
            created_at: {
                $gte:startDate,
                $lte:endDate
            }
        }

        options = {
            page: +req.body.page,
            limit: +req.body.pagesize,
            sort: {created_at: -1},
            populate:'given_to'
        }
    }

    reseller.find({creator: adminId, role: 'reseller' }, {id:1, user:1})
        .then(
            resellers => {

    transaction.paginate(query,options)
        .then(
            documents => {
                if(documents.totalDocs === 0){
                    res.status(200).json({
                        data: [],
                        msg: "No Data Available",
                        pages:1,
                        total:0,
                        resellers: resellers,
                        error: false
                    })
                }
                res.status(200).json({
                    data: documents.docs,
                    msg: "Successfully Read Transaction Data",
                    pages:documents.totalPages,
                    total:documents.totalDocs,
                    resellers: resellers,
                    error: false
                })
            }
        )
            })
        .catch(error => {
            console.log(error)
            return res.status(400).json({error: true, msg: "Transaction Reading Was Unsuccessful",err: error})
        })
};