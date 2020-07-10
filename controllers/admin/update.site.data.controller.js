/**
 * Update Site Data Controller
 */

const admin = require("../../models/admin.model");
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

    admin.updateOne({_id: req.adminData.userId}, newAdmin)
        .then( result => {
            if(result.n > 0) {
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