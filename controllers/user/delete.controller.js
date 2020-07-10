/**
 * User Delete Controller
 */

const user = require("../../models/users.model");
const jwt = require('jsonwebtoken');
exports.deleteUser = (req, res, next) => {
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    user.deleteOne({
        _id: decodedToken._id
    })
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

            return res.status(401).json({
                msg: "Failed To Delete User",
                error:true
            })
        })
}