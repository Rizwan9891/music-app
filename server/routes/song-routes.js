var express = require('express');
var songRouter = express.Router();
const {addSongUrl, addSongCover, getSongDetails,getSongs,getDetails, getSongToUpdate, getClicksByMonth, checkSong, updateSongUrl, getSongById} = require("../controllers/song-controller");
const isLoggedIn = require('../middlewares/isLoggedIn');

songRouter.post('/addSong',addSongUrl);
songRouter.post('/addSongCover/:id',isLoggedIn,addSongCover)
songRouter.post('/getSongDetails',getSongDetails)
songRouter.post('/getSongs',getSongs)
songRouter.post('/getDetails',getDetails)
songRouter.post('/updateSongUrl/:id',updateSongUrl);


songRouter.get('/getSongToUpdate/:id',getSongToUpdate)
songRouter.get('/getClicksByMonth/:month/:id',getClicksByMonth);
songRouter.get('/checkSong/:id',checkSong);
songRouter.get('/getSongById/:id',getSongById);

module.exports = songRouter;
