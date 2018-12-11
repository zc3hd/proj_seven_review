function Module(app) {
  var me = this;

  // 
  me.app = app;
  // 路由
  me.router = require('express').Router();

  // 模型
  me.User_model = require('../collection/user.js');
}
Module.prototype = {
  init: function() {
    var me = this;

    // 配置前缀
    me.api_pro = '/api/user';

    // login
    me.router.post('/login.do', function(req, res) {
      me._login(req, res);
    });

    // register
    me.router.post('/register.do', function(req, res) {
      me._register(req, res);
    });

    me.app.use(me.api_pro, me.router);
  },
    // 登录
  _login: function(req, res) {
    var me = this;
    me.User_model
      .findOne({ name: req.body.name })
      .populate({
        path: "plan",
        select: 'name',
      })
      .then(function(data) {

        // 没有这个用户
        if (data == null) {
          res.send({
            res: -1,
            desc: "no user"
          });
          return;
        }

        // 密码不对
        if (data.ps != req.body.ps) {
          res.send({
            res: -1,
            desc: "wrong ps"
          });
          return;
        }

        res.send(data);

      });
  },
  // 新增用户
  _register: function(req, res) {
    var me = this;

    me.User_model
      .create(req.body)
      .then(function(result) {
        res.send(result);
      })
      .catch(function (result) {
        res.send(result);
      });
  },

};



module.exports = Module;
