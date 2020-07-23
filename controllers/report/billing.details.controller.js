
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
                reseller.find({admin_id: adminId, role: 'reseller'}).then(bill => {
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