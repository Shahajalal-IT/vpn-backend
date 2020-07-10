/**
 * Update Admin Profile Controller
 */
const bcrypt = require('bcryptjs');
const admin = require("../../models/admin.model");
const jwt = require('jsonwebtoken');
exports.updateAdmin=  (req, res, next) => {

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    let newAdmin = {
        name: decodedToken.name,
        email: decodedToken.email
    };

    if(decodedToken.password !== ''){
        newAdmin.password =  bcrypt.hashSync(decodedToken.password, 8);
    }

    admin.updateOne({_id: req.adminData.userId}, newAdmin)
        .then( result => {
            if(result.n > 0) {
                return res.status(201).json({
                    msg: "Successfully Updated Profile",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Profile"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Profile",err: err})
        })

}