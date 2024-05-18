require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors =  require("cors")
var userRouter = require('./routes/user-routes');
const serviceRouter = require('./routes/service-routes')
const songRouter = require('./routes/song-routes');
const offerRouter = require('./routes/offer-routes')
const fileUpload = require("express-fileupload");
const offer = require('./models/OfferModel');
require("./models/dbConfig")
require("./cloudConfig")


var app = express();

app.set('veiw engine', 'ejs')
app.set("trust proxy", true);

app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(logger('dev'));
app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', userRouter);
app.use('/service',serviceRouter);
app.use('/song',songRouter);
app.use('/offer',offerRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
