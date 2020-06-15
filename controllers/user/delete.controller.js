/**
 * User Delete Controller
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;

exports.deleteUser = (req, res, next) => {

    user.destroy({
        where: { id: req.body.id,creator: req.resellerData.userId }
    })
        .then(result => {
            if(result > 0){
                return res.status(201).json({
                    msg: "Successfully Deleted User",
                    error:false
                })
            }else{
                return res.status(401).json({
                    msg: "Failed To Delete User",
                    error:true
                })
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(401).json({
                msg: "Failed To Delete User",
                error:true
            })
        })
}