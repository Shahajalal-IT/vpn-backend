/**
 * Get All Users by Admin Controller
 */
const db = require("../../models");
const user = db.user;
const admin = db.admin;
const reseller = db.reseller;
const Op = db.Sequelize.Op;

exports.getAllUserByAdmin = (req, res, next) => {
    const adminId = req.adminData.userId;
    const pageSize = +req.body.pagesize;
    const currentPage = +req.body.page;
    user.findAll({
        where:{admin_id: adminId },
        offset: (pageSize * (currentPage - 1)), limit: pageSize
    })
        .then(
            documents => {

                var finalDocuments = [];
                documents.forEach(function(obj,i) {

                    if(obj.creator_type === 'admin'){
                        admin.findByPk(obj.creator).then(result => {
                            var newObj = {
                                id:obj.id,
                                pin:obj.pin,
                                user:obj.user,
                                password:obj.password,
                                phone_unique:obj.phone_unique,
                                created_by:result.user,
                                creator_id:obj.creator,
                                activated_at:obj.activated_at,
                                expired_at:obj.expired_at,
                                type:obj.type,
                                active:obj.active,
                                notes:obj.notes,
                                device:obj.device,
                            };
                            finalDocuments.push(newObj);
                            if(i === documents.length-1){
                                res.status(200).json({
                                    data: finalDocuments,
                                    msg: "Successfully Read Admin Data",
                                    error:false
                                })
                            }
                        })
                    }else{
                        reseller.findByPk(obj.creator).then(result => {
                            var newObj = {
                                id:obj.id,
                                pin:obj.pin,
                                user:obj.user,
                                password:obj.password,
                                phone_unique:obj.phone_unique,
                                created_by:result.user,
                                creator_id:obj.creator,
                                activated_at:obj.activated_at,
                                expired_at:obj.expired_at,
                                type:obj.type,
                                active:obj.active,
                                notes:obj.notes,
                                device:obj.device,
                            };
                            finalDocuments.push(newObj);
                            if(i === documents.length-1){
                                res.status(200).json({
                                    data: finalDocuments,
                                    msg: "Successfully Read Admin Data",
                                    error:false
                                })
                            }
                        })
                    }

                });
            }
        )
        .catch(error => {
            return res.status(400).json({error: true, msg: "Admin Reading Was Unsuccessful",err: error})
        })
};