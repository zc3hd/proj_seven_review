function Module(app) {
  var me = this;

  // 
  me.app = app;
  // 路由
  me.router = require('express').Router();

  // 模型
  me.User_model = require('../collection/user.js');
  me.Plan_model = require('../collection/plan.js');

  // 邮件
  me.Email_send = require('../tool/email.js');
}
Module.prototype = {
  init: function() {
    var me = this;

    // 配置前缀
    me.api_pro = '/api/plan';

    // list
    me.router.post('/list.do', function(req, res) {
      me._list(req, res);
    });

    // add
    me.router.post('/add.do', function(req, res) {
      me._add(req, res);
    });

    // upd
    me.router.post('/upd.do', function(req, res) {
      me._upd(req, res);
    });

    // del
    me.router.post('/del.do', function(req, res) {
      me._del(req, res);
    });

    // mark
    me.router.post('/mark.do', function(req, res) {
      me._mark(req, res);
    });





    me.app.use(me.api_pro, me.router);
  },
  // 用户获取全部计划数据
  _list: function(req, res) {
    var me = this;
    me.User_model
      .findById(req.body._id)
      .populate({
        // 哪个字段被聚合了，我们要查询哪个聚合的字段
        path: "plans",
      })
      .then(function(data) {
        res.send({
          res: 0,
          desc: "",
          data: data,
        });
      });
  },
  _add: function(req, res) {
    var me = this;
    var _user_one = null;
    // 找用户
    me.User_model
      .findById(req.body.user_id)
      // 创建计划
      .then(function(data) {
        _user_one = data;
        return me.Plan_model.create({
          name: req.body.name,
          sum: req.body.sum,
          date: req.body.date,
        });
      })
      // 用户保存
      .then(function(data) {
        _user_one.plans.push(data._id);
        return _user_one.save();
      })
      // 返回
      .then(function() {
        res.send({ ret: 1 });
      });
  },
  _upd: function(req, res) {
    var me = this;
    // 找计划
    me.Plan_model
      .findById(req.body._id)
      // 计划保存
      .then(function(data) {

        data.name = req.body.name;
        data.sum = req.body.sum;
        data.date = req.body.date;
        return data.save();
      })
      // 返回
      .then(function(data) {
        res.send({ ret: 1 });
      });
  },
  _del: function(req, res) {
    var me = this;

    // 找计划
    me.Plan_model
      .deleteOne(req.body)
      // 返回
      .then(function() {
        res.send({ ret: 1 });
      });
  },
  // 做标记
  _mark: function(req, res) {
    var me = this;
    // 复制对象
    var todays = {};
    var str = '';
    for (var key in req.body) {
      if (key != 'user_id') {
        todays[key] = req.body[key];
        if (req.body[key] != 0) {
          str += `
          <h3>${key}：第${req.body[key]}轮</h3>
          `;
        }
      }
    }
    // 找用户
    me.User_model
      .findById(req.body.user_id)
      // 创建计划
      .then(function(data) {
        data.todays = JSON.stringify(todays);
        return data.save();
      })
      // 保存成功返回
      .then(function(data) {
        // 
        res.send(todays);

        // 
        me.Email_send({
            email: "343371169@qq.com",
            str: str,
          })
          .then(function(info) {
            console.log(info);
          });

      });
  },
};



module.exports = Module;
