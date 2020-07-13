/**
 * Add Due To SubReseller Controller
 */

const reseller = require("../../models/resellers.model");
const dues = require("../../models/due.model");
const jwt = require('jsonwebtoken');
exports.addDueReseller=  (req, res, next) => {
    const resellerId = req.resellerData.userId;
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );

    reseller.findById(resellerId).then(fatherReseller => {

        reseller.findById(decodedToken.reseller_id)
            .then( resellerData => {
                var due = resellerData.due - +decodedToken.amount;

            var newReseller = {
                due: due
            };
            const dueData = new dues({
                taken_by:resellerId,
                taken_by_name: fatherReseller.user,
                taken_by_type:'reseller',
                given_by:decodedToken.reseller_id,
                given_by_name: resellerData.user,
                previous_due: due + +decodedToken.amount,
                current_due: due,
                admin_id: fatherReseller.admin_id,
                notes:decodedToken.notes
            });

            reseller.updateOne({_id: decodedToken.reseller_id},newReseller)
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