
/**
 * Active Reseller Controller
 */

const reseller = require("../../models/resellers.model");
const jwt = require('jsonwebtoken');
exports.activeStatus =  (req, res, next) => {
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    var newReseller = {
        status:1
    };

    reseller.updateOne({
        _id: decodedToken._id
    },newReseller)
        .then( result => {
            if(result.n > 0) {
                return res.status(201).json({
                    msg: "Successfully Changed Status",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Changed Status"})
            }
        })
        .catch((err) => {

            return res.status(400).json({error: true,status: 201, msg: "Problem in Changed Status",err: err})
        })

}