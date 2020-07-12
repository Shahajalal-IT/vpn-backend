
/**
 * Billings Details Controller
 */

const admin = require("../../models/admin.model");
const reseller = require("../../models/resellers.model");
const due = require("../../models/due.model");
const reseller_transaction = require("../../models/reseller.transaction.model");
exports.sendBillingsDetails = (req, res, next) => {
    const adminId = req.adminData.userId;

    let data = {};

    due.find({admin_id: adminId, taken_by_type:'admin'}).then(allDue => {
            data.due = allDue;
            reseller_transaction.find({admin_id: adminId}).then(allResellerTransaction => {
                data.reseller_transaction = allResellerTransaction;
                reseller.find({admin_id: adminId, role: 'reseller', due: {$lt: 0}}).then(minus_value => {
                    data.minus_value = minus_value;
                    reseller.find({admin_id: adminId, role: 'reseller', due: {$eq: 0}}).then(zero_value => {
                        data.zero_value = zero_value;
                        reseller.find({admin_id: adminId, role: 'reseller', due: {$gt: 0}}).then(plus_value => {
                            data.plus_value = plus_value;
                            reseller.countDocuments({admin_id: adminId, role: 'reseller', due: {$lt: 0}}).then(minus_count => {
                                data.minus_count = minus_count;
                                reseller.countDocuments({admin_id: adminId, role: 'reseller', due: {$eq: 0}}).then(zero_count => {
                                    data.zero_count = zero_count;
                                    reseller.countDocuments({admin_id: adminId, role: 'reseller', due: {$gt: 0}}).then(plus_count => {
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