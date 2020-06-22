/**
 * Get Reseller Information Controller
 */
const db = require("../../models");
const reseller = db.reseller;
const admin = db.admin;
const Op = db.Sequelize.Op;

exports.getResellerInfo = (req, res, next) => {
    const resellerId = req.resellerData.userId;

    reseller.findOne({
        where:{id: resellerId}
    })
        .then(result => {
            admin.findByPk(result.admin_id).then(admin_info => {
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