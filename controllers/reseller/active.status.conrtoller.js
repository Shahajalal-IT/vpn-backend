
/**
 * Active Reseller Controller
 */
const db = require("../../models");
const reseller = db.reseller;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.activeStatus =  (req, res, next) => {
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    var newReseller = {
        status:1
    };

    reseller.update(newReseller,{
        where:{id: decodedToken.id}
    })
        .then( result => {
            if(result > 0) {
                return res.status(201).json({
                    msg: "Successfully Changed Status",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Changed Status"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Changed Status",err: err})
        })

}