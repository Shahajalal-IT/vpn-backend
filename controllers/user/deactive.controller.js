
/**
 * Deactive User Controller
 */

const user = require("../../models/users.model");
const jwt = require('jsonwebtoken');
exports.deactiveUser =  (req, res, next) => {

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    var newUser = {
        status:0
    };

    user.updateOne({
        _id: decodedToken._id
    },newUser)
        .then( result => {
            if(result.n > 0) {
                return res.status(201).json({
                    msg: "Successfully Deactivated User",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Deactivation User"})
            }
        })
        .catch((err) => {

            return res.status(400).json({error: true,status: 201, msg: "Problem in Deactivation Data",err: err})
        })

}