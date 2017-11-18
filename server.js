
var express = require('express');
var config = require('./config');
var router = require("./router");
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('views',path.join(__dirname,'./htmls'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',router);

app.listen(config.port, function () {
  console.log(`服务器开启了,http://localhost:${config.port}`);
})