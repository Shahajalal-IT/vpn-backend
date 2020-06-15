/**
 * Get All Admin Controller
*/
const db = require("../../models");
const admin = db.admin;
const Op = db.Sequelize.Op;

exports.getAllAdmin = (req, res, next) => {
    const superAdminId = req.superAdminData.userId;
    admin.findAll({where:{creator: superAdminId }})
        .then(
        documents => {
            res.status(200).json({
                data: documents,
                msg: "Successfully Read Admin Data",
                error:false
            })
        }
    )
        .catch(error => {
            return res.status(400).json({error: true, msg: "Admin Reading Was Unsuccessful",err: error})
        })
};