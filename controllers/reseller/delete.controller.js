/**
 * Reseller Delete Controller
 */
const db = require("../../models");
const reseller = db.reseller;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.deleteReseller = (req, res, next) => {
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    reseller.destroy({
        where:{id: decodedToken.id, creator: req.adminData.userId}
    })
        .then(result => {
            if(result > 0){
                return res.status(201).json({
                    msg: "Successfully Deleted Reseller",
                    error:false
                })
            }else{
                return res.status(401).json({
                    msg: "Failed To Delete Reseller",
                    error:true
                })
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(401).json({
                msg: "Failed To Delete Reseller",
                error:true
            })
        })
}