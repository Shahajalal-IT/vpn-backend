/**
 * User Delete Controller
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.deleteUser = (req, res, next) => {
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    user.destroy({
        where: { id: decodedToken.id}
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