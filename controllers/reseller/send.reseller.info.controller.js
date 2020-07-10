/**
 * Get Reseller Information Controller
 */

const reseller = require("../../models/resellers.model");
const admin = require("../../models/admin.model");
exports.getResellerInfo = (req, res, next) => {
    const resellerId = req.resellerData.userId;

    reseller.findOne({
        _id: resellerId
    })
        .then(result => {
            admin.findById(result.admin_id).then(admin_info => {
                res.status(200).json({
                    data: result,
                    site_name: admin_info.site_name,
                    site_title: admin_info.site_title,
                    msg: "Successfully Read Reseller Data",
                    error:false
                })
            })

        }).catch(error => {
        return res.status(400).json({error: true, msg: "Reseller Reading Was Unsuccessful",err: error})
    });
};