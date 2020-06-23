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
            creator: req.body.id,
            role: 'sub_reseller',
            admin_id: adminId
        }
    }
    reseller.paginate(options)
        .then(
            documents => {
                if(documents.total === 0){
                    res.status(200).json({
                        data: [],
                        pages: 1,
                        total: 1,
                        msg: "Successfully Read Reseller Data",
                        error: false
                    })
                }
                console.log(documents);
                var finalDocuments = [];
                var i=0;
                documents.docs.forEach(function(obj) {

                    reseller.findByPk(obj.creator).then(result => {

                        if(result === null){

                        }else{
                            var newObj = {
                                id: obj.id,
                                user: obj.user,
                                password: obj.password,
                                email: obj.email,
                                role: obj.role,
                                balance: obj.balance,
                                status: obj.status,
                                ios_price: obj.ios_price,
                                android_price: obj.android_price,
                                created_by: result.user,
                                creator_id: result.id,
                            };
                            finalDocuments.push(newObj);
                        }

                        if (i === documents.docs.length - 1) {
                            res.status(200).json({
                                data: finalDocuments,
                                pages: documents.pages,
                                total: documents.total,
                                msg: "Successfully Read Reseller Data",
                                error: false
                            })
                        }
                        i++;

                    })

                });
            }
        )
        .catch(error => {
            return res.status(400).json({error: true, msg: "Reseller Data Reading Was Unsuccessful",err: error})
        })
};