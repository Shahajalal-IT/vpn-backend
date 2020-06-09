/**
* Admin Delete Controller
*/
const admin = require('../../models/admin.model');

exports.deleteAdmin = (req, res, next) => {

    admin.deleteOne({_id: req.body.id, creator: req.superAdminData.userId})
        .then(result => {
            console.log(result);
            if(result.n > 0){
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