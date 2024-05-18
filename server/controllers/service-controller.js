const Service = require("../models/serviceModel");
const cloudinary = require("cloudinary");

const addService = async(req,res) =>{
    try{
        const {image,name} = req.body;
        const { public_id, secure_url} = await cloudinary.v2.uploader.upload(
            image,
            {
              folder: "musicapp",
            }
          );
        const service = await Service.create({public_id,secure_url,name});
        res.status(200).send({message:"service added",success:true,service});
    }catch(err){
        res.status(400).send({message:err,success:false})
    }
}
const getService = async (req,res) =>{
    try{
        const services = await Service.find({});
        res.status(200).send({message:'services found',success:true,services})
    }catch(err){
        res.status(400).send({message:err,success:false})
    }
}
const deleteService = async (req,res) =>{
    try{
        const id = req.params.id;
        const service = await Service.findByIdAndDelete(id);
        await cloudinary.v2.uploader.destroy(service.public_id);
        res.status(200).send({message:'service deleted',success:true})
    }catch(err){
        res.status(400).send({message:err,success:false});
    }
}
module.exports ={
    addService,
    getService,
    deleteService
}