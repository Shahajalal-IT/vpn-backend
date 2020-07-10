
/**
 * Active User Controller
 */

const user = require("../../models/users.model");
const jwt = require('jsonwebtoken');
exports.activeUser =  (req, res, next) => {
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    var newUser = {
        status:1
    };

    user.updateOne({
        _id: decodedToken._id
    },newUser)
        .then( result => {
            if(result.n > 0) {
                return res.status(201).json({
                    msg: "Successfully Activated User",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Activation User"})
            }
        })
        .catch((err) => {

            return res.status(400).json({error: true,status: 201, msg: "Problem in Activation Data",err: err})
        })

}