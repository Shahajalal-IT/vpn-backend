/**
 * Get All Reseller Controller
 */

const reseller = require("../../models/resellers.model");
exports.getAllForDropdown = (req, res, next) => {
    const adminId = req.adminData.userId;
    reseller.find({creator: adminId, role:'reseller' })
        .then(
            documents => {
                res.status(200).json({
                    data: documents,
                    msg: "Successfully Read Reseller Data",
                    error:false
                })
            }
        )
        .catch(error => {
            return res.status(400).json({error: true, msg: "Reseller Reading Was Unsuccessful",err: error})
        })
};