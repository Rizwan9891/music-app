const jwt = require('jsonwebtoken');
const isLoggedIn = async(req,res,next) => {
   try{
    const token = req.cookies.token;
    if(token){
        const isValidToken = await jwt.verify(token,process.env.JWT_SECRET);
        if(isValidToken){
            req.user_id = isValidToken.id;
            next();
        }else{
            res.status(401).send({message:'bad authentication'});
        }
    }else{
        res.status(401).send({message:'bad authentication'});
    }
   }catch(err){
    res.status(400).send({message:err})
   }
}
module.exports = isLoggedIn;