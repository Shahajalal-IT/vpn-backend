/**
 * Assign Creator Controller
 */

const user = require("../../models/users.model");
exports.assignCreator = (req, res, next) => {
    const resellerId = req.resellerData.userId;

    user.updateMany({creator: resellerId, serial: {$gte: +req.body.start_serial, $lte: +req.body.end_serial}},{creator: req.body.reseller_id}).then(result => {

        if(result.n > 0) {
            return res.status(201).json({
                msg: "Successfully Updated User Creator",
                error:false
            })
        }else {
            return res.status(400).json({error: true,status: 201, msg: "Problem in Updating User Creator"})
        }
    }).catch(error => {
            return res.status(400).json({error: true, msg: "Problem in Updating User Creator",err: error})
        })
};