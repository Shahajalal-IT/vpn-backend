/**
 * Get All Users by Reseller Controller
 */

const user = require("../../models/users.model");
const admin = require("../../models/admin.model");
const reseller = require("../../models/resellers.model");

exports.getAllUserByReseller = (req, res, next) => {

    const resellerId = req.resellerData.userId;

    const query = {
        user: {$regex: req.body.key, $options: 'i'},
        creator: resellerId,
        creator_type:'reseller'
    }

    const options = {
        page: +req.body.page,
        limit: +req.body.pagesize,
        sort: {created_at: -1}
    }

    user.paginate(query,options)
        .then(
            documents => {
                if(documents.totalDocs === 0){
                    res.status(200).json({
                        data: [],
                        pages: 1,
                        total: 1,
                        msg: "Successfully Read User Data",
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
                                _id:obj._id,
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
                        }

                        if(i === documents.docs.length-1){
                            res.status(200).json({
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
        .catch(error => {
            return res.status(400).json({error: true, msg: "User Reading Was Unsuccessful",err: error})
        })
};