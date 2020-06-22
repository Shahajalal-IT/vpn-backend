/**
 * Get All Users by Reseller Controller
 */
const db = require("../../models");
const user = db.user;
const admin = db.admin;
const reseller = db.reseller;
const Op = db.Sequelize.Op;

exports.getAllUserByReseller = (req, res, next) => {

    const resellerId = req.resellerData.userId;
    const options = {
        page: +req.body.page, // Default 1
        paginate: +req.body.pagesize, // Default 25
        order: [['id', 'DESC']],
        where: {
            user: { [Op.like]: `%`+req.body.key+`%` },
            creator: resellerId
        }
    }

    user.paginate(options)
        .then(
            documents => {
                var finalDocuments = [];
                documents.docs.forEach(function(obj,i) {
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
                            status:obj.status,
                            notes:obj.notes,
                            device:obj.device,
                        };
                        finalDocuments.push(newObj);
                        if(i === documents.docs.length-1){
                            res.status(200).json({
                                data: finalDocuments,
                                pages:documents.pages,
                                total:documents.total,
                                msg: "Successfully Read User Data",
                                error:false
                            })
                        }
                    })

                });
            }
        )
        .catch(error => {
            return res.status(400).json({error: true, msg: "User Reading Was Unsuccessful",err: error})
        })
};