/**
 * Get Admin Information Controller
*/
const db = require("../../models");
const admin = db.admin;
const Op = db.Sequelize.Op;

exports.getAdminInfo = (req, res, next) => {
    const adminId = req.adminData.userId;

    admin.findOne({
        where:{id: adminId}
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