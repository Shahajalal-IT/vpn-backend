
/**
 * Update User Controller
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
exports.updateUser =  (req, res, next) => {

    var newUser = {
        pin: req.body.pin,
        user: req.body.user,
        password: req.body.password,
    };

    if(req.body.password !== ''){
        newUser.password =  bcrypt.hashSync(req.body.password, 8);
    }

    user.update(newUser,{
        where:{id: req.body.id}
    })
        .then( result => {
            if(result > 0) {
                return res.status(201).json({
                    msg: "Successfully Updated User",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Updating User"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Data",err: err})
        })

}