/**
 * Get All Sub Reseller Controller
 */
const db = require("../../models");
const reseller = db.reseller;
const Op = db.Sequelize.Op;

exports.getAllForDropdown = (req, res, next) => {
    const resellerId = req.resellerData.userId;
    reseller.findAll({where:{creator: resellerId }})
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