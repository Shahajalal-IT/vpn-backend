/**
 * Get All Users by Reseller Id Controller
 */

const user = require("../../models/users.model");
const admin = require("../../models/admin.model");
const reseller = require("../../models/resellers.model");

exports.getAllUserByReseller = (req, res, next) => {

    const resellerId = req.body._id;

    var d = new Date();
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
        statusArray = [0,1]
    }else{
        statusArray = [+req.body.status]
    }

    const query = {
        creator: resellerId,
        active: { $in: activeArray },
        status: { $in: statusArray },
        created_at: {
            $gte:startDate,
            $lte:endDate
        },
        creator_type:'reseller'
    }

    const options = {
        page: +req.body.page,
        limit: +req.body.pagesize,
        sort: {created_at: -1}
    }


    user.paginate(query,options)
        .then(
            documents => {
                if(documents.totalDocs === 0){
                    res.status(200).json({
                        data: [],
                        pages: 1,
                        total: 1,
                        msg: "Successfully Read User Data",
                        error: false
                    })
                }
                var finalDocuments = [];
                var i=0;
                documents.docs.forEach(function(obj) {
                    reseller.findById(obj.creator).then(result => {
                        if(result === null){

                        }else{
                            var newObj = {
                                _id:obj._id,
                                pin:obj.pin,
                                user:obj.user,
                                password:obj.password,
                                phone_unique:obj.phone_unique,
                                created_by:result.user,
                                creator_id:obj.creator,
                                activated_at:obj.activated_at,
                                expired_at:obj.expired_at,
                                type:obj.type,
                                active:obj.active,
                                status:obj.status,
                                notes:obj.notes,
                                device:obj.device,
                            };
                            finalDocuments.push(newObj);
                        }

                        if(i === documents.docs.length-1){
                            res.status(200).json({
                                data: finalDocuments,
                                pages:documents.totalPages,
                                total:documents.totalDocs,
                                msg: "Successfully Read User Data",
                                error:false
                            })
                        }
                        i++;
                    })

                });
            }
        )
        .catch(error => {
            return res.status(400).json({error: true, msg: "User Reading Was Unsuccessful",err: error})
        })
};