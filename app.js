var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');  //
var app = express();

var flash = require('connect-flash'); // do vali null error 、傳動作後 error 的訊息從post to get??
var validator = require('express-validator');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// session
var session = require("express-session")
app.use(express.static("public"));
app.use(session({ secret: 'mysupersecret', resave: true, saveUninitialized: true }));

app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());  // json请求
app.use(bodyParser.urlencoded({ extended: true })); // 表单请求 //expresss   includes bodyParser
// app.use(express.json()); //出錯 
// app.use(express.urlencoded({ extended:false }));

app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes   在此 控制器router folder 連上 view/ ejs
  var routes = require('./routes/index');
  var login = require('./routes/login');
  var messageBoard = require('./routes/messageBoard');
  var signup = require('./routes/signup');
  var user = require('./routes/user');
  app.use('/', routes);
  app.use('/login', login);
  app.use('/signup', signup);

  app.use('/messageBoard', messageBoard);

  //頁面瀏覽權限控管 (Middleware) 有登入才會進到 user.ejs 不能透過 url/user.ejs 進入 => 判斷session > next
  // app.use('/user', user);  //更改 路徑與動作連線
  app.use('/user', function(req,res,next){
    if(req.session.uid){
      return next();
    }
    res.redirect('/');
  });

//登出
app.use('/logout', function(req,res,next){
  req.session.uid="";
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
