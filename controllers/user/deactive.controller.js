
/**
 * Deactive User Controller
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;

exports.deactiveUser =  (req, res, next) => {

    var newUser = {
        status:0
    };

    user.update(newUser,{
        where:{id: req.body.id}
    })
        .then( result => {
            if(result > 0) {
                return res.status(201).json({
                    msg: "Successfully Deactivated User",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Deactivation User"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Deactivation Data",err: err})
        })

}