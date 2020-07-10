/**
 * SubReseller Delete Controller
 */

const reseller = require("../../models/resellers.model");
const jwt = require('jsonwebtoken');
exports.deleteReseller = (req, res, next) => {
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    reseller.deleteOne({
        _id: decodedToken._id, creator: req.resellerData.userId
    })
        .then(result => {
            if(result.n > 0){
                return res.status(201).json({
                    msg: "Successfully Deleted SubReseller",
                    error:false
                })
            }else{
                return res.status(401).json({
                    msg: "Failed To Delete SubReseller",
                    error:true
                })
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(401).json({
                msg: "Failed To Delete SubReseller",
                error:true
            })
        })
}