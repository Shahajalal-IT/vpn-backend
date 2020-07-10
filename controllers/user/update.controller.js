
/**
 * Update User Controller
 */

const user = require("../../models/users.model");
const jwt = require('jsonwebtoken');
exports.updateUser =  (req, res, next) => {

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    var newUser = {
        pin: decodedToken.pin,
        user: decodedToken.username,
        password: decodedToken.password,
        notes: decodedToken.notes
    };

    user.updateOne({
        _id: decodedToken._id
    },newUser)
        .then( result => {
            if(result.n > 0) {
                return res.status(201).json({
                    msg: "Successfully Updated User",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Updating User"})
            }
        })
        .catch((err) => {

            return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Data",err: err})
        })

}