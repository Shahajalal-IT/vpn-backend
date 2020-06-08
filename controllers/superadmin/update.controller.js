/*

Update Super Admin Controller

*/
const bcrypt = require('bcryptjs');
const superAdmin = require('../../models/superadmin.model');
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

    superAdmin.updateOne({_id: req.body.id}, newsuperAdmin)
        .then( result => {
            console.log(newsuperAdmin);
            if(result.n > 0) {
                return res.status(201).json({
                    data: newsuperAdmin,
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