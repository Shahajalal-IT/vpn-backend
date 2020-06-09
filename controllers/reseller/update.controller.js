/**
* Update Reseller Controller
*/
const bcrypt = require('bcryptjs');
const reseller = require('../../models/resellers.model');
exports.updateReseller=  (req, res, next) => {

    var newReseller = {
        user: req.body.user,
        email: req.body.email,
        name: req.body.name,
        updated_at: Date.now()
    };

    if(req.body.password !== ''){
        newReseller.password =  bcrypt.hashSync(req.body.password, 8);
    }

    reseller.updateOne({_id: req.body.id}, newReseller)
        .then( result => {
            if(result.n > 0) {
                return res.status(201).json({
                    data: newReseller,
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