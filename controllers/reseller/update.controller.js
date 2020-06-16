/**
* Update Reseller Controller
*/
const bcrypt = require('bcryptjs');
const db = require("../../models");
const reseller = db.reseller;
const Op = db.Sequelize.Op;
exports.updateReseller=  (req, res, next) => {

    var newReseller = {
        user: req.body.user,
        email: req.body.email,
        android_price: req.body.android_price,
        ios_price: req.body.ios_price
    };

    if(req.body.password !== ''){
        newReseller.password =  bcrypt.hashSync(req.body.password, 8);
    }

    reseller.update(newReseller,{where:{id: req.body.id}})
        .then( result => {
            if(result > 0) {
                return res.status(201).json({
                    msg: "Successfully Updated Reseller",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Reseller"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Reseller",err: err})
        })

}