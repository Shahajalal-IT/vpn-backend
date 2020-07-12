/**
 * Add Due To Reseller Controller
 */

const reseller = require("../../models/resellers.model");
const dues = require("../../models/due");
const jwt = require('jsonwebtoken');
exports.addDueReseller=  (req, res, next) => {
    const adminId = req.adminData.userId;
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    reseller.findById(decodedToken.reseller_id)
        .then( reseller => {
            due = reseller.due - +decodedToken.amount;
            return due;
        }).then(due => {
        var newReseller = {
            due: due
        };
        const dueData = new dues({
            taken_by:adminId,
            taken_by_type:'admin',
            given_by:decodedToken.reseller_id,
            previous_due: due + +decodedToken.amount,
            current_due: due,
            notes: decodedToken.notes,
            admin_id: adminId,
        });

        reseller.updateOne({_id: decodedToken.reseller_id},newReseller)
            .then( result => {
                if(result.n > 0) {

                    dueData.save().then(result => {
                        console.log('Successfully Created Due')
                    });

                    return res.status(201).json({
                        msg: "Successfully Received Payment",
                        error:false
                    })
                }else {
                    return res.status(400).json({error: true,status: 201, msg: "Problem in Receiving Payment"})
                }
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({error: true,status: 201, msg: "Problem in Receiving Payment",err: err})
            })

    });
}