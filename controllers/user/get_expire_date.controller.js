
/**
 * Get Expire Date
 */

const user = require("../../models/users.model");
exports.getExpireDate =  (req, res, next) => {

    user.findOne({
        pin: req.body.user
    })
        .then(user => {

            return res.status(201).json({
                msg: "Successfully Got Expire Date",
                data: user.expired_at.toLocaleDateString(),
                error:false
            })


        }).catch((err) => {
        console.log(err)
        return res.status(400).json({
            msg: "Problem in getting Expire Date",
            error:true
        })
    })
}