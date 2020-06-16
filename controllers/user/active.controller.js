
/**
 * Active User Controller
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;

exports.activeUser =  (req, res, next) => {

    var newUser = {
        status:1
    };

    user.update(newUser,{
        where:{id: req.body.id}
    })
        .then( result => {
            if(result > 0) {
                return res.status(201).json({
                    msg: "Successfully Activated User",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Activation User"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Activation Data",err: err})
        })

}