
/**
 * Reset Phone Unique Controller
 */

const user = require("../../models/users.model");
const jwt = require('jsonwebtoken');
exports.resetPhoneUnique =  (req, res, next) => {

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    var newUser = {
        phone_unique:""
    };

    user.updateOne({
        _id: decodedToken._id
    },newUser)
        .then( result => {
            if(result.n > 0) {
                return res.status(201).json({
                    msg: "Successfully Reset Phone Unique",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Resetting Phone Unique"})
            }
        })
        .catch((err) => {

            return res.status(400).json({error: true,status: 201, msg: "Problem in Resetting Phone Unique",err: err})
        })

}