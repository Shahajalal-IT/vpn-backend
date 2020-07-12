
/**
 * Billings Details For Reseller Controller
 */

const admin = require("../../models/admin.model");
const reseller = require("../../models/resellers.model");
const due = require("../../models/due.model");
const reseller_transaction = require("../../models/reseller.transaction.model");
exports.sendBillingsDetails = (req, res, next) => {
    const resellerId = req.resellerData.userId;

    let data = {};

    due.find({taken_by: resellerId, taken_by_type:'reseller'}).then(allDue => {
        data.due = allDue;
        reseller_transaction.find({creator: resellerId}).then(allResellerTransaction => {
            data.reseller_transaction = allResellerTransaction;
            reseller.find({creator: resellerId, role: 'sub_reseller', due: {$lt: 0}}).then(minus_value => {
                data.minus_value = minus_value;
                reseller.find({creator: resellerId, role: 'sub_reseller', due: {$eq: 0}}).then(zero_value => {
                    data.zero_value = zero_value;
                    reseller.find({creator: resellerId, role: 'sub_reseller', due: {$gt: 0}}).then(plus_value => {
                        data.plus_value = plus_value;
                        reseller.countDocuments({creator: resellerId, role: 'sub_reseller', due: {$lt: 0}}).then(minus_count => {
                            data.minus_count = minus_count;
                            reseller.countDocuments({creator: resellerId, role: 'sub_reseller', due: {$eq: 0}}).then(zero_count => {
                                data.zero_count = zero_count;
                                reseller.countDocuments({creator: resellerId, role: 'sub_reseller', due: {$gt: 0}}).then(plus_count => {
                                    data.plus_count = plus_count;

                                    res.status(200).json({
                                        data: data,
                                        msg: "Successfully Read Billings Details Data",
                                        error: false
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
        .catch(error => {
            return res.status(400).json({error: true, msg: "Billings Details Reading Was Unsuccessful",err: error})
        })
};