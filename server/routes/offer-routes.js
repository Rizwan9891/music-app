var express = require('express');
const getOffer = require('../controllers/offer-controller');
var offerRouter = express.Router();

//GET
offerRouter.get('/getOffer',getOffer);

module.exports = offerRouter;