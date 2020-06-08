/*

Get All Admin Controller

*/
const admin = require('../../models/admin.model');

exports.getAllAdmin = (req, res, next) => {
    const pageSize = +req.body.pagesize;
    const currentPage = +req.body.page;
    const superAdminId = req.superAdminData.userId;

    const adminQuery = admin.find({creator: superAdminId });
    let fetchedAdmin;
    if(pageSize && currentPage) {
        adminQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    adminQuery.then(
        documents => {
            fetchedAdmin = documents;
            return admin.countDocuments();
        }
    ).then(count => {
        res.status(200).json({
            data: fetchedAdmin,
            msg: "Successfully Read Admin Data",
            error:false,
            maxAdmin: count
        })
    })
        .catch(error => {
            return res.status(400).json({error: true, msg: "Admin Reading Was Unsuccessful",err: error})
        })
};