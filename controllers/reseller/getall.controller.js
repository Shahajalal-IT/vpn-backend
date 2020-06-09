/**
* Get All Admin Controller
*/
const reseller = require('../../models/resellers.model');

exports.getAllReseller = (req, res, next) => {
    const pageSize = +req.body.pagesize;
    const currentPage = +req.body.page;
    const adminId = req.adminData.userId;

    const resellerQuery = reseller.find({creator: adminId });
    let fetchedReseller;
    if(pageSize && currentPage) {
        resellerQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    resellerQuery.then(
        documents => {
            fetchedReseller = documents;
            return reseller.countDocuments();
        }
    ).then(count => {
        res.status(200).json({
            data: fetchedReseller,
            msg: "Successfully Read Reseller Data",
            error:false,
            maxAdmin: count
        })
    })
        .catch(error => {
            return res.status(400).json({error: true, msg: "Reseller Reading Was Unsuccessful",err: error})
        })
};