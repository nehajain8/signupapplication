const express = require('express');
const server = express();
const path = require('path');
const port = 3030;
const bodyParser= require('body-parser');
const routes = require('./loginRouter/route');
var createError = require('http-errors');
var nofavicon = require("express-no-favicons");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session= require('express-session');
var expressValidator = require('express-validator');

var multer= require('multer');
var flash=require('connect-flash');
var bcrypt=require('bcryptjs');
var mongo= require('mongodb');
var mongoose = require('mongoose');
var db= mongoose.connection;


//listen to http request on mentioned port.
server.set('views','./views');
server.set('view engine','ejs');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

server.use('/static',express.static('resources'));

//Handle sessions

server.use(session({
  secret:'max',
  saveUninitialized: true,
  resave: true
}));


//Vaidator
server.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    ,formParam = root;
    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

server.use(require('connect-flash')());
server.use(function(req,res,next){
  res.locals.messages = require('express-messages')(req,res);
  next();
})
  
//handle request
server.use('/', routes);

server.listen(port,() => {
    console.log('Server  is listening on port' + port);
})