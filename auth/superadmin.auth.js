/**
 * Super Admin Auth-----------------------
 */
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try{

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(
            token,
            process.env.SECRET
        );
        if(decodedToken.role === 'super_admin') {
            req.superAdminData = {
                userId: decodedToken.id
            };
            next();
        }else{
            return res.status(400).json({error: true,status: 201, msg: "You are not authenticated",err: err})
        }

    }catch (err) {
        return res.status(400).json({error: true,status: 201, msg: "You are not authenticated",err: err})
    }
}