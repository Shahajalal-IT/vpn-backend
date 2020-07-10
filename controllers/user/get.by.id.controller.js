
/**
 * Get User By ID Controller
 */

const user = require("../../models/users.model");
exports.getUserById =  (req, res, next) => {

    user.findById(req.body._id)
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
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Getting Data",err: err})
        })

}