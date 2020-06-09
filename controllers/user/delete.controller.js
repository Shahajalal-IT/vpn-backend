/**
 * User Delete Controller
 */
const user = require('../../models/users.model');

exports.deleteUser = (req, res, next) => {

    user.deleteOne({_id: req.body.id, creator: req.resellerData.userId})
        .then(result => {
            if(result.n > 0){
                return res.status(201).json({
                    msg: "Successfully Deleted User",
                    error:false
                })
            }else{
                return res.status(401).json({
                    msg: "Failed To Delete User",
                    error:true
                })
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(401).json({
                msg: "Failed To Delete User",
                error:true
            })
        })
}