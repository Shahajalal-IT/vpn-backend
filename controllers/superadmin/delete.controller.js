/**
 * Super Admin Delete Controller
*/

const superAdmin = require("../../models/superadmin.model");

exports.deleteSuperAdmin = (req, res, next) => {

    superAdmin.deleteOne({_id: req.body._id})
        .then(result => {
            if(result.n > 0){
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