/**
* Admin Delete Controller
*/
const db = require("../../models");
const admin = db.admin;
const Op = db.Sequelize.Op;

exports.deleteAdmin = (req, res, next) => {

    admin.destroy({
        where: {
            id: req.body.id,
            creator: req.superAdminData.userId
        }
    })
        .then(result => {
            if(result > 0){
                return res.status(201).json({
                    msg: "Successfully Deleted Admin",
                    error:false
                })
            }else{
                return res.status(401).json({
                    msg: "Failed To Delete Admin",
                    error:true
                })
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(401).json({
                msg: "Failed Delete Admin",
                error:true
            })
        })
}