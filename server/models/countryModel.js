const mongoose = require("mongoose");

const countryModel = new mongoose.Schema({
    name:{
        type:String,
        default:"unknown",
    },
    north:Number,
    south:Number,
    east:Number,
    west:Number,
})
const country = mongoose.model("country",countryModel)
module.exports = country;