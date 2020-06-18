
/**
 * User create By Admin Controller------
 */
const db = require("../../models");
const user = db.user;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring')
exports.createUser =  (req, res, next) => {
    const adminId = req.adminData.userId;
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    const randonPin = new Set()

    while (randonPin.size < +decodedToken.no_of_account) {
        randonPin.add(decodedToken.username_prefix+randomstring.generate(6))
    }

    let i = 0;
    for (const value of randonPin.values()) {
        const pass = randomstring.generate(6);
        const newUser = {
            pin: value,
            user: value,
            password: pass,
            type: decodedToken.duration,
            active: 1,
            status: 0,
            notes: decodedToken.notes,
            device: decodedToken.device,
            creator: adminId,
            creator_type: 'admin',
            admin_id: adminId
        };

        user.create(newUser).then(result => {
            i++;
            if(i === randonPin.size){
                return res.status(201).json({
                    msg: `Successfully Created `+ i +` Users`,
                    error:false
                })
            }
        }).catch(error => {
            return res.status(400).json({error: true,status: 201, msg: "User Creation unsuccessful",err: error})
        })
    }


}

