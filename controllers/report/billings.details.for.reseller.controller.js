
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
            reseller.find({creator: resellerId, role: 'sub_reseller'}).then(bill => {
                data.bill = bill;

                res.status(200).json({
                    data: data,
                    msg: "Successfully Read Billings Details Data",
                    error: false
                })
            })
        })
    })
        .catch(error => {
            return res.status(400).json({error: true, msg: "Billings Details Reading Was Unsuccessful",err: error})
        })
};