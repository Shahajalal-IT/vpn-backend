/**
 * Super Admin Delete Controller
*/
const db = require("../../models");
const superAdmin = db.superadmin;
const Op = db.Sequelize.Op;

exports.deleteSuperAdmin = (req, res, next) => {

    superAdmin.destroy({
        where: { id: req.body.id }
    })
        .then(result => {
            if(result > 0){
                return res.status(201).json({
                    msg: "Successfully Deleted Super Admin",
                    error:false
                })
            }else{
                return res.status(401).json({
                    msg: "Failed To Deleted Super Admin",
                    error:true
                })
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(401).json({
                msg: "Failed Deleted Super Admin",
                error:true
            })
        })
}