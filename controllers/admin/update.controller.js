/**
 * Update Admin Controller
*/

const admin = require("../../models/admin.model");
const bcrypt = require('bcryptjs');
exports.updateAdmin =  (req, res, next) => {

    var newAdmin = {
        user: req.body.user,
        email: req.body.email,
        name: req.body.name,
        site_name: req.body.site_name,
        site_title: req.body.site_title
    };

    if(req.body.password !== ''){
        newAdmin.password =  bcrypt.hashSync(req.body.password, 8);
    }

    admin.updateOne({_id: req.body._id}, newAdmin)
        .then( result => {
            if(result.n > 0) {
                return res.status(201).json({
                    msg: "Successfully Updated Admin",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Admin"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Data",err: err})
        })

}