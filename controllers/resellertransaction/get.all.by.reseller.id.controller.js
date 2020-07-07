/**
 * Get All Users by Reseller Id Controller
 */
const db = require("../../models");
const user = db.user;
const admin = db.admin;
const reseller_transaction = db.reseller_transaction;
const reseller = db.reseller;
const Op = db.Sequelize.Op;

exports.getAllResTransByResellerId = (req, res, next) => {

    const adminId = req.adminData.userId
    const resellerId = req.body.id;
    const options = {
        page: +req.body.page, // Default 1
        paginate: +req.body.pagesize, // Default 25
        order: [['id', 'DESC']],
        where: {
            reseller_id: resellerId,
            admin_id: adminId
        }
    }
    reseller.findByPk(resellerId).then(reseller => {
        reseller_transaction.paginate(options)
            .then(
                documents => {
                    if(documents.total === 0){
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
                        user.findByPk(obj.user_id).then(result => {
                            if(result === null){

                            }else{
                                var newObj = {
                                    id:obj.id,
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
                                    pages:documents.pages,
                                    total:documents.total,
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