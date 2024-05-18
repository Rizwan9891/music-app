const mongoose = require('mongoose');

const offerModel = new mongoose.Schema({
    oldPrice:{
        type:Number,
        default:0,
    },
    newPrice:{
        type:Number,
        default:0,
    },
    features:[],
})

const offer = mongoose.model('offer',offerModel);
module.exports = offer;