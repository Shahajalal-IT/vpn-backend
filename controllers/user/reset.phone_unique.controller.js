
/**
 * Reset Phone Unique Controller
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.resetPhoneUnique =  (req, res, next) => {

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    var newUser = {
        phone_unique:""
    };

    user.update(newUser,{
        where:{id: decodedToken.id}
    })
        .then( result => {
            if(result > 0) {
                return res.status(201).json({
                    msg: "Successfully Reset Phone Unique",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Resetting Phone Unique"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Resetting Phone Unique",err: err})
        })

}