/**
 * Update Site Data Controller
 */
const bcrypt = require('bcryptjs');
const db = require("../../models");
const admin = db.admin;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.updateAdminSiteData=  (req, res, next) => {

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    var newAdmin = {
        site_title: decodedToken.siteTitle,
        site_name: decodedToken.site_name
    };

    admin.update(newAdmin,{where:{id: req.adminData.userId}})
        .then( result => {
            if(result > 0) {
                return res.status(201).json({
                    msg: "Successfully Updated Site Data",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Site Data"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Site Data",err: err})
        })

}