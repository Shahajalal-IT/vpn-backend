/**
 * Get All Admin Controller
 */
const db = require("../../models");
const reseller = db.reseller;
const Op = db.Sequelize.Op;

exports.getAllForDropdown = (req, res, next) => {
    const adminId = req.adminData.userId;
    reseller.findAll({where:{creator: adminId }})
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