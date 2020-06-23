/**
 * Update Admin Profile Controller
 */
const bcrypt = require('bcryptjs');
const db = require("../../models");
const admin = db.admin;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.updateAdmin=  (req, res, next) => {

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    var newAdmin = {
        name: decodedToken.name,
        email: decodedToken.email
    };

    if(decodedToken.password !== ''){
        newAdmin.password =  bcrypt.hashSync(decodedToken.password, 8);
    }

    admin.update(newAdmin,{where:{id: req.adminData.userId}})
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