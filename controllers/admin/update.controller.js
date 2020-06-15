/*
Update Admin Controller
*/
const db = require("../../models");
const admin = db.admin;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
exports.updateAdmin =  (req, res, next) => {

    var newAdmin = {
        user: req.body.user,
        email: req.body.email
    };

    if(req.body.password !== ''){
        newAdmin.password =  bcrypt.hashSync(req.body.password, 8);
    }

    admin.update(newAdmin,{
        where:{id: req.body.id}
    })
        .then( result => {
            if(result > 0) {
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