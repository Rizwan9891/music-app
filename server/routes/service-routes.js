var express = require('express');
var serviceRouter = express.Router();
const {addService, getService, deleteService} = require("../controllers/service-controller");
const isAdmin = require('../middlewares/isAdmin');
const isLoggedIn = require('../middlewares/isLoggedIn');

serviceRouter.post('/addService',isLoggedIn,isAdmin,addService);
serviceRouter.get('/getService',getService)
serviceRouter.post('/deleteService/:id',isLoggedIn,isAdmin,deleteService)

module.exports = serviceRouter;