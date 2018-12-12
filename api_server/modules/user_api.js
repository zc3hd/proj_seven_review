function Module(app) {
  var me = this;

  me.conf = {
    // admin标识
    key: "arminc",
    _id: '5c10a987ef30715734599b4d',
  };
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

    // upd
    me.router.post('/upd.do', function(req, res) {
      me._upd(req, res);
    });


    // ======================================admin
    // list
    me.router.post('/list.do', function(req, res) {
      me._list(req, res);
    });

    // ad_upd
    me.router.post('/ad_upd.do', function(req, res) {
      me._ad_upd(req, res);
    });

    // del
    me.router.post('/del.do', function(req, res) {
      me._del(req, res);
    });










    me.app.use(me.api_pro, me.router);
  },
  // 登录
  _login: function(req, res) {
    var me = this;
    me.User_model
      .findOne({ name: req.body.name })
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

        // admin
        if (req.body.name == me.conf.key) {
          // 5c10a987ef30715734599b4d
          res.send({
            _id: data._id,
            key: 'king',
          });
        }
        // user
        else {
          res.send(data);
        }


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
      .catch(function(result) {
        res.send(result);
      });
  },
  // 用户端可以修改的信息
  _upd: function(req, res) {
    var me = this;
    me.User_model
      .findById(req.body._id)
      .then(function(data) {
        data.ps = req.body.ps;
        data.email = req.body.email;

        return data.save();
      })
      .then(function() {
        res.send({
          res: 0,
        });
      });
  },

  // =========================================admin
  _check_admin: function(req, res) {
    var me = this;
    return new Promise(function(resovle, reject) {
      me.User_model
        // 核验admin
        .findById(req.body.admin_id)
        .then(function(data) {

          // 不是admin
          if (data == null) {
            resovle({ res: -1 })
          } else {
            resovle({ res: 0 })
          }

        });
    });
  },
  //
  _list: function(req, res) {
    var me = this;
    me._check_admin(req, res)
      .then(function(data) {
        // 验证不成功
        if (data.res == -1) {
          res.send(data);
        }
        // 
        else {
          me.User_model
            .find()
            .populate({
              path: "plans",
              select: 'name',
            })
            .then(function(data) {
              res.send(data);
            });
        }

      });
  },
  // admin可以修改的信息
  _ad_upd: function(req, res) {
    var me = this;

    me._check_admin(req, res)
      .then(function(data) {
        // 验证不成功
        if (data.res == -1) {
          res.send(data);
        }
        return me.User_model.findById(req.body._id)
      })
      .then(function(data) {
        data.plans_limit = req.body.plans_limit;
        data.email_key = req.body.email_key;
        return data.save();
      })
      .then(function() {
        res.send({
          res: 0,
        });
      });
  },
  //
  _del: function(req, res) {
    var me = this;

    me._check_admin(req, res)
      .then(function(data) {
        // 验证不成功
        if (data.res == -1) {
          res.send(data);
        }
        return me.User_model.deleteOne({_id:req.body._id})
      })
      .then(function() {
        res.send({
          res: 0,
        });
      });
  },






};



module.exports = Module;
