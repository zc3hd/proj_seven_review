// 全局工具函数
var FN = require('../tool/common.js');

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





  // 生成间隔的天数
  _one_jg_days: function(obj) {
    var day = 1;
    var jg_days = [];
    for (var i = 0; i < obj.sum; i++) {
      jg_days.push(day);
      // 下一次的数据
      day = day * 2;
      switch (day) {
        case 8:
          day = 7;
          break;
        case 14:
          day = 15;
          break;
      }
    }
    obj.jg_days = jg_days;
  },
  // 生成间隔的日期
  _one_jg_date: function(obj) {
    var new_chuo = 0;
    var new_str = '';
    // 收集每项日期的 数组
    var new_str_arr = [];

    // 复习周期
    obj.jg_days.forEach(function(ele, index) {

      // 新的戳,减一：是因为第一天就算复习了。
      new_chuo = FN.f_str_miao(obj.date) + 24 * 3600000 * (ele - 1);
      // 新日期str
      new_str = FN.f_miao_str(new_chuo, true);

      // 新的字符串数组
      new_str_arr.push(new_str);
    });
    // 本对象挂载
    obj.jg_date = new_str_arr;
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
        // console.log(_user_one);
        // 现有计划 等于 边界值
        if (_user_one.plans.length == _user_one.plans_limit) {
          res.send({
            ret: -1,
            plans_limit: _user_one.plans_limit
          });
          return;
        }

        // 生成间隔
        me._one_jg_days(req.body);
        // 生成日期
        me._one_jg_date(req.body);

        // 没有达到限制就生成一个数据
        return me.Plan_model.create({
          name: req.body.name,
          sum: req.body.sum,
          jg_days: req.body.jg_days,

          date: req.body.date,
          jg_date: req.body.jg_date,

          // 邮件提醒时间
          note_time: req.body.note_time,
        });

      })
      // 用户保存这个计划
      .then(function(data) {
        _user_one.plans.push(data._id);
        return _user_one.save();
      })
      // 返回用户的创建
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
        // 生成间隔
        me._one_jg_days(req.body);
        // 生成日期
        me._one_jg_date(req.body);


        data.name = req.body.name;
        data.sum = req.body.sum;
        data.jg_days = req.body.jg_days;

        data.date = req.body.date;
        data.jg_date = req.body.jg_date;

        // 邮件提醒时间
        data.note_time = req.body.note_time;


        return data.save();
      })
      // 返回
      .then(function(data) {
        res.send({ ret: 1 });
      });
  },
  // 
  _del: function(req, res) {
    var me = this;
    // 
    var _user_one = null;
    // return;
    me.User_model
      .findById(req.body.user_id)
      // 创建计划
      .then(function(data) {
        _user_one = data;
        // 用户中的计划删除
        _user_one.plans.splice(_user_one.plans.indexOf(req.body._id), 1);
        return _user_one.save();
      })
      // 找计划 删除
      .then(function(data) {
        return me.Plan_model.deleteOne(req.body)
      })
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
