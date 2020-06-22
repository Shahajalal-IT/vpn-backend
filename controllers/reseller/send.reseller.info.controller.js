/**
 * Get Reseller Information Controller
 */
const db = require("../../models");
const reseller = db.reseller;
const Op = db.Sequelize.Op;

exports.getAdminInfo = (req, res, next) => {
    const resellerId = req.resellerData.userId;

    reseller.findOne({
        where:{id: resellerId}
    })
        .then(result => {
            console.log(result);
            res.status(200).json({
                data: result,
                msg: "Successfully Read Admin Data",
                error:false
            })
        }).catch(error => {
        return res.status(400).json({error: true, msg: "Admin Reading Was Unsuccessful",err: error})
    });
};