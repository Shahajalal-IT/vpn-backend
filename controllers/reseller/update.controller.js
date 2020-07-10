/**
* Update Reseller Controller
*/

const reseller = require("../../models/resellers.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.updateReseller=  (req, res, next) => {

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    var newReseller = {
        user: decodedToken.username,
        email: decodedToken.email,
        android_price: decodedToken.android_price,
        ios_price: decodedToken.ios_price
    };

    if(decodedToken.password !== ''){
        newReseller.password =  bcrypt.hashSync(decodedToken.password, 8);
    }

    reseller.update({_id: decodedToken._id},newReseller)
        .then( result => {
            if(result.n > 0) {
                return res.status(201).json({
                    msg: "Successfully Updated Reseller",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Reseller"})
            }
        })
        .catch((err) => {
            return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Reseller",err: err})
        })

}