/**
 * Get All Users by Reseller Id Controller
 */

const user = require("../../models/users.model");
const admin = require("../../models/admin.model");
const reseller_transaction = require("../../models/reseller.transaction.model");
const reseller = require("../../models/resellers.model");
exports.getAllResTransByResellerId = (req, res, next) => {

    const adminId = req.adminData.userId
    const resellerId = req.body._id;

    const query = {
        reseller_id: resellerId,
        admin_id: adminId
    }

    const options = {
        page: +req.body.page,
        limit: +req.body.pagesize,
        sort: {created_at: -1}
    }
    reseller.findById(resellerId).then(reseller => {
        reseller_transaction.paginate(query,options)
            .then(
                documents => {
                    if(documents.totalDocs === 0){
                        res.status(200).json({
                            data: [],
                            pages: 1,
                            total: 0,
                            reseller_name: reseller.user,
                            msg: "Successfully Read User Data",
                            error: false
                        })
                    }
                    var finalDocuments = [];
                    var i=0;
                    documents.docs.forEach(function(obj) {
                        user.findById(obj.user_id).then(result => {
                            if(result === null){

                            }else{
                                var newObj = {
                                    _id:obj._id,
                                    reseller_id:obj.reseller_id,
                                    user_id:obj.user_id,
                                    user:result.pin,
                                    p_balance:obj.p_balance,
                                    c_balance:obj.c_balance,
                                    price:obj.price,
                                    createdAt:obj.createdAt,
                                    updatedAt:obj.updatedAt
                                };
                                finalDocuments.push(newObj);
                            }

                            if(i === documents.docs.length-1){
                                res.status(200).json({
                                    reseller_name: reseller.user,
                                    data: finalDocuments,
                                    pages:documents.totalPages,
                                    total:documents.totalDocs,
                                    msg: "Successfully Read User Data",
                                    error:false
                                })
                            }
                            i++;
                        })

                    });
                }
            )

    }) .catch(error => {
        return res.status(400).json({error: true, msg: "User Reading Was Unsuccessful",err: error})
    })




};