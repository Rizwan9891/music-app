const User = require("../models/userModel");

const isOnBoarded = async(req,res) =>{
    try{
        const user = User.findById(req.user_id);
        if(user.isOnBoarded){
            res.status(200).send({message:'user on boarded'});
        }else{
            res.status(401).send({message:'user not on boarded'});
        }
        
    }catch(err){
        res.status(400).send({message:err});
    }
}

module.exports = isOnBoarded;