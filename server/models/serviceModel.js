const mongoose = require("mongoose");

const serviceModel = new mongoose.Schema({
    public_id:String,
    secure_url:String,
    name:String,
})
const service = mongoose.model("service",serviceModel);

module.exports = service;