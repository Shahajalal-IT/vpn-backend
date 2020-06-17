
/**
 * Update User Controller
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
exports.updateUser =  (req, res, next) => {

    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    var newUser = {
        pin: decodedToken.pin,
        user: decodedToken.username,
        password: decodedToken.password,
        notes: decodedToken.notes
    };

    user.update(newUser,{
        where:{id: decodedToken.id}
    })
        .then( result => {
            if(result > 0) {
                return res.status(201).json({
                    msg: "Successfully Updated User",
                    error:false
                })
            }else {
                return res.status(400).json({error: true,status: 201, msg: "Problem in Updating User"})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({error: true,status: 201, msg: "Problem in Updating Data",err: err})
        })

}