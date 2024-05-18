const Offer = require("../models/OfferModel");

const getOffer = async(req,res) =>{
    try{
        const offers = await Offer.find({});
        res.status(200).send({message:'offer found',offers})
    }catch(err){
        res.status(400).send({message:err})
    }
}
module.exports = getOffer;