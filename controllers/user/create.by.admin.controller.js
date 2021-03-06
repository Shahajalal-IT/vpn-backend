
/**
 * User create By Admin Controller------
 */

const user = require("../../models/users.model");
const jwt = require('jsonwebtoken');

exports.createUser =  (req, res, next) => {
    const adminId = req.adminData.userId;
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    const newUser = new user({
        pin: decodedToken.pin,
        type: decodedToken.duration,
        active: 0,
        status: 0,
        notes: decodedToken.notes,
        device: decodedToken.device,
        creator: adminId,
        onModel:'admins',
        creator_type: 'admin',
        admin_id: adminId
    });
    newUser.save().then((result) => {
        if(result){
            return res.status(201).json({
                msg: "Successfully Created User",
                error:false
            })
        }else{
            return res.status(400).json({error: true,status: 201, msg: "User Creation was Unsuccessful",err: err})
        }

    }).catch((err) => {
        console.log(err);
        return res.status(400).json({error: true,status: 201, msg: "User Creation was Unsuccessful",err: err})
    });
}