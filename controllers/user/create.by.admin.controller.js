
/**
 * User create By Admin Controller------
 */

const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');

exports.createUser =  (req, res, next) => {
    const adminId = req.adminData.userId;
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    const newUser = {
        pin: decodedToken.pin,
        user: decodedToken.username,
        password: decodedToken.password,
        type: decodedToken.duration,
        active: 0,
        status: 0,
        notes: decodedToken.notes,
        device: decodedToken.device,
        creator: adminId,
        creator_type: 'admin',
        admin_id: adminId
    };
    user.create(newUser).then((result) => {
        return res.status(201).json({
            msg: "Successfully Created User",
            error:false
        })
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({error: true,status: 201, msg: "User Creation was Unsuccessful",err: err})
    });
}