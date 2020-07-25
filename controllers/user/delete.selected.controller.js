/**
 * Selected User Delete Controller
 */

const user = require("../../models/users.model");
const jwt = require('jsonwebtoken');
exports.deleteUser = (req, res, next) => {
    const fetchedData = req.body.data;
    const decodedToken = jwt.verify(
        fetchedData,
        process.env.SECRET
    );
    let i = 0;
    for (const value of decodedToken.ids) {
        user.deleteOne({
            _id: value
        })
            .then(result => {
                if(result.n > 0){
                    i++;
                    if(i===decodedToken.ids.length){
                        return res.status(201).json({
                            msg: `Successfully Deleted `+i+` User`,
                            error:false
                        })
                    }

                }else{

                }
            })
            .catch(error => {
                console.log(error);
                return res.status(401).json({
                    msg: "Failed To Delete User",
                    error:true
                })
            })
    }
}