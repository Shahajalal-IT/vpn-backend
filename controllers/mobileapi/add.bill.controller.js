/**
 * Add Due To SubReseller Controller
 */

const reseller = require("../../models/resellers.model");
const dues = require("../../models/due.model");
const jwt = require('jsonwebtoken');
exports.addDueReseller=  (req, res, next) => {
    const resellerId = req.resellerData.userId;

    reseller.findById(resellerId).then(fatherReseller => {

        reseller.findById(req.body.reseller_id)
            .then( resellerData => {
                var due = resellerData.due - +req.body.amount;

                var newReseller = {
                    due: due
                };
                const dueData = new dues({
                    taken_by:resellerId,
                    taken_by_name: fatherReseller.user,
                    taken_by_type:'reseller',
                    given_by:req.body.reseller_id,
                    given_by_name: resellerData.user,
                    previous_due: due + +req.body.amount,
                    current_due: due,
                    admin_id: fatherReseller.admin_id,
                    notes:req.body.notes
                });

                reseller.updateOne({_id: req.body.reseller_id},newReseller)
                    .then( result => {
                        if(result.n > 0) {

                            dueData.save().then(result => {
                                console.log('Successfully Created Due')
                            });

                            return res.status(201).json({
                                msg: "Successfully Added Balance",
                                error:false
                            })
                        }else {
                            return res.status(400).json({error: true,status: 201, msg: "Problem in Adding Balance"})
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(400).json({error: true,status: 201, msg: "Problem in Adding Balance",err: err})
                    })

            });

    })
}