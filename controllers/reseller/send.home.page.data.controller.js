/**
 * Send Home page value For Reseller Controller
 */

const admin = require("../../models/admin.model");
const reseller = require("../../models/resellers.model");
const user = require("../../models/users.model");
exports.sendHomePageData = (req, res, next) => {
    const resellerId = req.resellerData.userId;

    var data = {};

    reseller.countDocuments({creator: resellerId, role:'sub_reseller'})
        .then(
            documents => {
                data.resellerCount = documents;
                user.countDocuments({creator: resellerId,creator_type:'reseller'}).then(ownuser => {
                    data.ownAccount = ownuser;
                    reseller.find({role:'sub_reseller',creator:resellerId}).then(allsub =>{

                        var all_sub_id=[];
                        allsub.map(sub =>{
                            all_sub_id.push(sub._id)
                        })


                    user.countDocuments({creator_type:'reseller', creator:{
                                $in: all_sub_id
                            }}).then(resellerAccount => {
                        data.resellerAccount = resellerAccount;
                        user.countDocuments({creator: resellerId,creator_type:'reseller',active:1}).then(onlineAccount => {
                            data.online = onlineAccount;
                            user.countDocuments({creator: resellerId,creator_type:'reseller',status:1}).then(activeAccount => {
                                data.activeAccount = activeAccount;
                                user.countDocuments({creator: resellerId,creator_type:'reseller',expired_at:{
                                        $lt: Date.now()
                                        }}).then(expiredAccount => {
                                    data.expiredAccount = expiredAccount;

                                    reseller.find({creator: resellerId,role:'sub_reseller'}, {id:1, user:1})
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
                })
            }
        )
        .catch(error => {
            return res.status(400).json({error: true, msg: "Home Page Reading Was Unsuccessful",err: error})
        })
};