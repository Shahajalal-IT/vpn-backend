/**
 * Send Home page value For Reseller Controller
 */
const db = require("../../models");
const admin = db.admin;
const reseller = db.reseller;
const user = db.user;
const Op = db.Sequelize.Op;

exports.sendHomePageData = (req, res, next) => {
    const resellerId = req.resellerData.userId;

    var data = {};

    reseller.count({where:{creator: resellerId, role:'sub_reseller'}})
        .then(
            documents => {
                data.resellerCount = documents;
                user.count({where:{creator: resellerId,creator_type:'reseller'}}).then(ownuser => {
                    data.ownAccount = ownuser;
                    user.count({where:{creator_type:'reseller', creator:{
                                [Op.ne]: resellerId
                            }}}).then(resellerAccount => {
                        data.resellerAccount = resellerAccount;
                        user.count({where:{creator: resellerId,creator_type:'reseller',active:1}}).then(onlineAccount => {
                            data.online = onlineAccount;
                            user.count({where:{creator: resellerId,creator_type:'reseller',status:1}}).then(activeAccount => {
                                data.activeAccount = activeAccount;
                                user.count({where:{creator: resellerId,creator_type:'reseller',expired_at:{
                                            [Op.lt]: Date.now()
                                        }}}).then(expiredAccount => {
                                    data.expiredAccount = expiredAccount;

                                    reseller.findAll({where:{creator: resellerId,role:'sub_reseller'},attributes: ['id', 'user']})
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