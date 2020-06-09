/**
 * Reseller Delete Controller
 */
const reseller = require('../../models/resellers.model');

exports.deleteReseller = (req, res, next) => {

    reseller.deleteOne({_id: req.body.id, creator: req.adminData.userId})
        .then(result => {
            if(result.n > 0){
                return res.status(201).json({
                    msg: "Successfully Deleted Reseller",
                    error:false
                })
            }else{
                return res.status(401).json({
                    msg: "Failed To Delete Reseller",
                    error:true
                })
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(401).json({
                msg: "Failed To Delete Reseller",
                error:true
            })
        })
}