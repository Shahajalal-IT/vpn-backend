/*

Update Admin Controller

*/
const bcrypt = require('bcryptjs');
const admin = require('../../models/admin.model');
exports.updateAdmin =  (req, res, next) => {

    var newAdmin = {
        user: req.body.user,
        email: req.body.email,
        name: req.body.name,
        updated_at: Date.now()
    };

    if(req.body.password !== ''){
        newAdmin.password =  bcrypt.hashSync(req.body.password, 8);
    }

    admin.updateOne({_id: req.body.id}, newAdmin)
        .then( result => {
            console.log(newAdmin);
            if(result.n > 0) {
                return res.status(201).json({
                    data: newAdmin,
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