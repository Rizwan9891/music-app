const User = require("../models/userModel");

const isAdmin = async(req,res,next) =>{
    try{
        const user_id = req.user_id;
        const user = await User.findById(user_id);
        if(user.isAdmin){
            next();
        }else{
            res.status(403).send({message:'you are not authorized'})
        }
    }catch(err){
        res.status(400).send({message:err});
    }
}
module.exports = isAdmin;