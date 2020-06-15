
/**
* Update Super Admin Controller
*/
const db = require("../../models");
const superAdmin = db.superadmin;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
exports.updateSuperAdmin =  (req, res, next) => {

    var newsuperAdmin = {
        user: req.body.user,
        email: req.body.email,
        name: req.body.name,
        updated_at: Date.now()
    };

    if(req.body.password !== ''){
        newsuperAdmin.password =  bcrypt.hashSync(req.body.password, 8);
    }

    superAdmin.update(newsuperAdmin,{
        where:{id: req.body.id}
    })
        .then( result => {
            if(result > 0) {
                return res.status(201).json({
                    msg: "Successfully Updated Super Admin",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Super Admin"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Data",err: err})
        })

}