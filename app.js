var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require("cookie-parser");
const session = require("express-session");
var logger = require('morgan');
const dotenv = require("dotenv");
const cors = require('cors');
var db = require("./config/db")



var homeRouter = require('./routes/home');
var loginRouter =  require('./routes/auth/login');
var signupRouter = require('./routes/auth/signup')  ;
var logoutRouter = require('./routes/auth/logout') ;
var commentRouter =  require('./routes/comment') ;


dotenv.config();
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// set a cookie
app.use(function (req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
        //console.log('cookie created successfully');
    } else {
        // yes, cookie was already present
        //console.log('cookie exists', cookie);
    }
    next(); // <-- important!
});


app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);
app.use('/comment', commentRouter);

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
