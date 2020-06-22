
/**
 * User create By Reseller Controller------
 */

const db = require("../../models");
const user = db.user;
const reseller = db.reseller;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');

exports.createUser =  (req, res, next) => {
    const resellerId = req.resellerData.userId;
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    reseller.findByPk(resellerId).then(result => {
        const newUser = {
            pin: decodedToken.pin,
            user: decodedToken.username,
            password: decodedToken.password,
            type: decodedToken.duration,
            active: 0,
            status: 0,
            notes: decodedToken.notes,
            device: decodedToken.device,
            creator: resellerId,
            creator_type: 'admin',
            admin_id: result.admin_id
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
    })

}