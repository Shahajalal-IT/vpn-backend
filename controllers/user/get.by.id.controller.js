
/**
 * Get User By ID Controller
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;

exports.getUserById =  (req, res, next) => {

    user.findByPk(req.body.id)
        .then( result => {
            if(result) {
                return res.status(201).json({
                    data: result,
                    msg: "Successfully Get User Data",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Getting User"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Getting Data",err: err})
        })

}