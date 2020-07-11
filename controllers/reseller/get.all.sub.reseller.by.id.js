/**
 * Get All Reseller Controller
 */

const reseller = require("../../models/resellers.model");
const admin = require("../../models/admin.model");

exports.getAllReseller = (req, res, next) => {
    const adminId = req.adminData.userId;

    const query = {
        user: {$regex: req.body.key, $options: 'i'},
        creator: req.body._id,
        role: 'sub_reseller',
        admin_id: adminId
    }

    const options = {
        page: +req.body.page,
        limit: +req.body.pagesize,
        sort: {created_at: -1}
    }
    reseller.paginate(query,options)
        .then(
            documents => {
                if(documents.totalDocs === 0){
                    res.status(200).json({
                        data: [],
                        pages: 1,
                        total: 1,
                        msg: "Successfully Read Reseller Data",
                        error: false
                    })
                }

                var finalDocuments = [];
                var i=0;
                documents.docs.forEach(function(obj) {

                    reseller.findById(obj.creator).then(result => {

                        if(result === null){

                        }else{
                            var newObj = {
                                _id: obj._id,
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
                                pages:documents.totalPages,
                                total:documents.totalDocs,
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