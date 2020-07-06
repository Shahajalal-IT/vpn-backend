/**
 * Get All Users by Reseller Id Controller
 */
const db = require("../../models");
const user = db.user;
const admin = db.admin;
const reseller = db.reseller;
const Op = db.Sequelize.Op;

exports.getAllUserByReseller = (req, res, next) => {

    const resellerId = req.body.id;


    var d = new Date();
    d.setHours(0,0,0,0);
    var ed = new Date();
    ed.setMonth(ed.getMonth() - 1);
    ed.setHours(23,59,59,999);

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

    var activeArray = [0,1]
    if(+req.body.active === 0){
        activeArray = [0]
    }else if(+req.body.active === 1){
        activeArray = [1]
    }

    var statusArray = [0,1]
    if(+req.body.status === 0){
        statusArray = [0]
    }else if(+req.body.status === 1){
        statusArray = [1]
    }

    const options = {
        page: +req.body.page, // Default 1
        paginate: +req.body.pagesize, // Default 25
        order: [['id', 'DESC']],
        where: {
            creator: resellerId,
            active: { [Op.between]: activeArray },
            status: { [Op.between]: statusArray },
            createdAt: {
                [Op.between]: [startDate, endDate]
            },
            creator_type:'reseller'
        }
    }

    user.paginate(options)
        .then(
            documents => {
                if(documents.total === 0){
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
                    reseller.findByPk(obj.creator).then(result => {
                        if(result === null){

                        }else{
                            var newObj = {
                                id:obj.id,
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
                                pages:documents.pages,
                                total:documents.total,
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