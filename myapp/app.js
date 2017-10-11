var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var ejs = require('ejs');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//使用html模板
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    layout: 'layout'});
});

//数据库连接
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'nodesample',
});


connection.connect();

// var  userAddSql = 'INSERT INTO userinfo(Id,UserName,UserPass) VALUES(0,?,?)';
// var  userAddSql_Params = ['Wilson', 'abcd'];
//增
// connection.query(userAddSql,userAddSql_Params,function (err, result) {
//         if(err){
//          console.log('[INSERT ERROR] - ',err.message);
//          return;
//         }
//
//        console.log('--------------------------INSERT----------------------------');
//        //console.log('INSERT ID:',result.insertId);
//        console.log('INSERT ID:',result);
//        console.log('-----------------------------------------------------------------\n\n');
// });


// var userModSql = 'UPDATE userinfo SET UserName = ?,UserPass = ? WHERE Id = ?';
// var userModSql_Params = ['钟慰', '5678',1];
// //改
// connection.query(userModSql,userModSql_Params,function (err, result) {
//    if(err){
//          console.log('[UPDATE ERROR] - ',err.message);
//          return;
//    }
//   console.log('--------------------------UPDATE----------------------------');
//   console.log('UPDATE affectedRows',result.affectedRows);
//   console.log('-----------------------------------------------------------------\n\n');
// });


var  userGetSql = 'SELECT * FROM userinfo';
//查
connection.query(userGetSql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }

       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('-----------------------------------------------------------------\n\n');
});

connection.end();

module.exports = app;
