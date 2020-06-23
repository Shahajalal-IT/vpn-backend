/**
* Get All Reseller Controller
*/
const db = require("../../models");
const reseller = db.reseller;
const admin = db.admin;
const Op = db.Sequelize.Op;

exports.getAllReseller = (req, res, next) => {
    const adminId = req.adminData.userId;
    const options = {
        page: +req.body.page, // Default 1
        paginate: +req.body.pagesize, // Default 25
        order: [['id', 'DESC']],
        where: {
            user: { [Op.like]: `%`+req.body.key+`%` },
            admin_id: adminId,
            role:'reseller'
        }
    }
    reseller.paginate(options)
        .then(
            documents => {

                var finalDocuments = [];
                documents.docs.forEach(function(obj,i) {
                    if(obj.role === 'reseller'){
                        admin.findByPk(obj.creator).then(result => {
                            var newObj = {
                                id:obj.id,
                                user:obj.user,
                                password:obj.password,
                                email:obj.email,
                                role:obj.role,
                                balance:obj.balance,
                                status:obj.status,
                                ios_price:obj.ios_price,
                                android_price:obj.android_price,
                                created_by:result.user,
                                creator_id:result.id,
                            };
                            finalDocuments.push(newObj);
                            if(i === documents.docs.length-1){
                                res.status(200).json({
                                    data: finalDocuments,
                                    pages:documents.pages,
                                    total:documents.total,
                                    msg: "Successfully Read Reseller Data",
                                    error:false
                                })
                            }
                        })
                    }else{
                        reseller.findByPk(obj.creator).then(result => {
                            var newObj = {
                                id:obj.id,
                                user:obj.user,
                                password:obj.password,
                                email:obj.email,
                                role:obj.role,
                                balance:obj.balance,
                                status:obj.status,
                                ios_price:obj.ios_price,
                                android_price:obj.android_price,
                                created_by:result.user,
                                creator_id:result.id,
                            };
                            finalDocuments.push(newObj);
                            if(i === documents.docs.length-1){
                                res.status(200).json({
                                    data: finalDocuments,
                                    pages:documents.pages,
                                    total:documents.total,
                                    msg: "Successfully Read Reseller Data",
                                    error:false
                                })
                            }
                        })
                    }

                });
            }
        )
        .catch(error => {
            return res.status(400).json({error: true, msg: "Reseller Data Reading Was Unsuccessful",err: error})
        })
};