/**
 * Get All Sub Reseller Controller
 */

const reseller = require("../../models/resellers.model");
exports.getAllForDropdown = (req, res, next) => {
    const resellerId = req.resellerData.userId;
    reseller.find({creator: resellerId, role: 'sub_reseller'})
        .then(
            documents => {
                res.status(200).json({
                    data: documents,
                    msg: "Successfully Read SubReseller Data",
                    error:false
                })
            }
        )
        .catch(error => {
            return res.status(400).json({error: true, msg: "SubReseller Reading Was Unsuccessful",err: error})
        })
};