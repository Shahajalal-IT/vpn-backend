/**
 * Update Reseller Profile Controller
 */
const bcrypt = require('bcryptjs');
const db = require("../../models");
const reseller = db.reseller;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.updateReseller=  (req, res, next) => {

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    var newReseller = {
        user: decodedToken.name,
        email: decodedToken.email
    };

    if(decodedToken.password !== ''){
        newReseller.password =  bcrypt.hashSync(decodedToken.password, 8);
    }

    reseller.update(newReseller,{where:{id: req.resellerData.userId}})
        .then( result => {
            if(result > 0) {
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