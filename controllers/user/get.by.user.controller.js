
/**
 * Get User By user Controller
 */

const user = require("../../models/users.model");
exports.getUserByUser =  (req, res, next) => {

    user.findOne({pin:req.body.user})
        .then( result => {
            if(result) {
                return res.status(201).json({
                    data: result,
                    msg: "Successfully Get User Data",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Getting User"})
            }
        })
        .catch((err) => {
            return res.status(400).json({error: true,status: 201, msg: "Problem in Getting Data",err: err})
        })

}