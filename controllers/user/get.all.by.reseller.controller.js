/**
 * Get All Users by Reseller Controller
 */

const user = require("../../models/users.model");
const admin = require("../../models/admin.model");
const reseller = require("../../models/resellers.model");

exports.getAllUserByReseller = (req, res, next) => {

    const resellerId = req.resellerData.userId;

    var d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(23,59,59,999);
    var ed = new Date();
    ed.setMonth(ed.getMonth() - 1);
    ed.setHours(0,0,0,0);

    var startDate,endDate;
    if(req.body.start_date === ''){
        startDate = ed;
    }else{
        startDate = new Date(req.body.start_date);
        startDate.setHours(0,0,0,0);
    }

    if(req.body.end_date === ''){
        endDate = d;
    }else{
        endDate = new Date(req.body.end_date);
        endDate.setHours(23,59,59,999);
    }

    let activeArray =[]
    if(req.body.active === "") {
        activeArray = [0,1]
    } else {
        activeArray = [+req.body.active]
    }

    let statusArray = []
    if(req.body.status === ""){
        statusArray = [0,1,3]
    }else{
        statusArray = [+req.body.status]
    }

    reseller.find({role:'sub_reseller',creator:resellerId}).then(allsub => {

        let creatorArray = [];
        if(req.body.creator_type === ""){
            creatorArray.push(resellerId);
            allsub.map(sub => {
                creatorArray.push(sub._id)
            })
        }else if(req.body.creator_type === "own"){
            creatorArray = [resellerId];
        }else{
            allsub.map(sub => {
                creatorArray.push(sub._id)
            })
        }


        const query = {
            active: {$in: activeArray},
            status: {$in: statusArray},
            created_at: {
                $gte: startDate,
                $lte: endDate
            },
            pin: {$regex: req.body.key, $options: 'i'},
            creator: {$in: creatorArray},
            creator_type: 'reseller'
        }

        const options = {
            page: +req.body.page,
            limit: +req.body.pagesize,
            sort: {serial: -1},
            populate: 'creator'
        }

        user.paginate(query, options)
            .then(
                documents => {
                    if (documents.totalDocs === 0) {
                        res.status(200).json({
                            data: [],
                            pages: 1,
                            total: 1,
                            msg: "Successfully Read User Data",
                            error: false
                        })
                    }

                    res.status(200).json({
                        data: documents.docs,
                        pages: documents.totalPages,
                        total: documents.totalDocs,
                        msg: "Successfully Read User Data",
                        error: false
                    })

                }
            )
            .catch(error => {
                return res.status(400).json({error: true, msg: "User Reading Was Unsuccessful", err: error})
            })
    });
};