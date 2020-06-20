/**
 * Send Home page value Controller
 */
const db = require("../../models");
const admin = db.admin;
const reseller = db.reseller;
const user = db.user;
const Op = db.Sequelize.Op;

exports.sendHomePageData = (req, res, next) => {
    const adminId = req.adminData.userId;

    var data = {};

    reseller.count({where:{creator: adminId }})
        .then(
            documents => {
                data.resellerCount = documents;
                user.count({where:{creator: adminId}}).then(ownuser => {
                    data.ownAccount = ownuser;
                    user.count({where:{admin_id: adminId, creator:{
                                [Op.ne]: adminId
                            }}}).then(resellerAccount => {
                        data.resellerAccount = resellerAccount;
                        user.count({where:{admin_id: adminId,active:1}}).then(onlineAccount => {
                            data.online = onlineAccount;
                            user.count({where:{admin_id: adminId,status:1}}).then(activeAccount => {
                                data.activeAccount = activeAccount;
                                user.count({where:{admin_id: adminId,expired_at:{
                                            [Op.lt]: Date.now()
                                        }}}).then(expiredAccount => {
                                    data.expiredAccount = expiredAccount;

                                    reseller.findAll({where:{creator: adminId },attributes: ['id', 'user']})
                                        .then(
                                            resellerList => {
                                                data.resellerList = resellerList;

                                                res.status(200).json({
                                                    data: data,
                                                    msg: "Successfully Read Home Page Data",
                                                    error:false
                                                })
                                            }
                                        )
                                        .catch(error => {
                                            return res.status(400).json({error: true, msg: "Reseller Reading Was Unsuccessful",err: error})
                                        })

                                })
                            })
                        })
                    })
                })
            }
        )
        .catch(error => {
            return res.status(400).json({error: true, msg: "Home Page Reading Was Unsuccessful",err: error})
        })
};