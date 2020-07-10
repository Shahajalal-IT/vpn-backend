
/**
 * Get User By ID Controller
 */

const reseller = require("../../models/resellers.model");
exports.getResellerById =  (req, res, next) => {

    reseller.findById(req.body._id)
        .then( result => {
            if(result) {
                return res.status(201).json({
                    data: result,
                    msg: "Successfully Get Reseller Data",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Getting Reseller"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Getting Data",err: err})
        })

}