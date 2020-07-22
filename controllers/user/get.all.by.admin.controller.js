/**
 * Get All Users by Admin Controller
 */

const user = require("../../models/users.model");
const admin = require("../../models/admin.model");
const reseller = require("../../models/resellers.model");

exports.getAllUserByAdmin = (req, res, next) => {

    const adminId = req.adminData.userId;
    const query = {
        user: {$regex: req.body.key, $options: 'i'},
        admin_id: adminId
    }
    const options = {
        page: +req.body.page,
        limit: +req.body.pagesize,
        sort: {created_at: -1},
        populate:'creator'
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

                res.status(200).json({
                    data: documents.docs,
                    pages:documents.totalPages,
                    total:documents.totalDocs,
                    msg: "Successfully Read User Data",
                    error:false
                })

            }
        )
        .catch(error => {
            return res.status(400).json({error: true, msg: "User Reading Was Unsuccessful",err: error})
        })
};