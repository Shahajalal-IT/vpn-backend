/**
 * Get Admin Information Controller
*/

const admin = require("../../models/admin.model");

exports.getAdminInfo = (req, res, next) => {
    const adminId = req.adminData.userId;

    admin.findOne({
        _id: adminId
    })
        .then(result => {

            res.status(200).json({
                data: result,
                msg: "Successfully Read Admin Data",
                error:false
            })
        }).catch(error => {
        return res.status(400).json({error: true, msg: "Admin Reading Was Unsuccessful",err: error})
    });
};