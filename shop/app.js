var debug = require('debug')('shop:app:debug');
var error = require('debug')('shop:app:error');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); 
var logger = require('morgan');

var shopRouter = require('./routes/shop'); 
var restRouter = require('./routes/rest');
require('./database');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(['/shop/views', 'shop/views/'], shopRouter); 
app.use(['/shop/rest', 'shop/rest/'], restRouter); 
module.exports = app;