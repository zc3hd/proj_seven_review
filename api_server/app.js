var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var conf = require('../conf.js');

// =====================================================连接数据库
mongoose.connect('mongodb://localhost/' + conf.db);
// 链接数据库
mongoose.connection.once('open', function() {
  console.log('数据库已连接');
});




// =====================================================API
// 提供所有的API
function API(app) {
  // post应该放在内部，不然就没有设置post
  // app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // 用户
  var user_api = require('./moudles/user_api.js');
  new user_api(app).init();

  // 用户
  var plan_api = require('./moudles/plan_api.js');
  new plan_api(app).init();
}


// dev
if (process.env.NODE_ENV == 'dev') {
  // 
  module.exports = function(app) {
    API(app);
  };
}
// build
else {
  // 提供静态文件
  app.use(express.static(path.join(__dirname, '../webapp/')));

  API(app);

  app.listen(conf.api_port);
  console.log('build app服务 ' + conf.api_port);
}
