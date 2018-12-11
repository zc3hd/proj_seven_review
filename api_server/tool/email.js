// 邮件的配置
var conf = {
  user: '343371169@qq.com',
  pass: 'zgltsujynhrhbijg',
  h:"08",
};


var FN = require('./common.js');

function Module() {
  var me = this;

  // 
  me.nodemailer = require('nodemailer');
  // 模型
  me.User_model = require('../collection/user.js');
}
Module.prototype = {
  init: function() {
    var me = this;

    // 初始化邮件服务器
    me._init_emailSever();

    // 发送一次
    // me._send();
    me._send_by_day();
  },
  // 初始化邮件服务器
  _init_emailSever: function() {
    var me = this;
    me.transporter = me.nodemailer.createTransport({
      service: 'qq',
      auth: {
       user:conf.user, 
       pass:conf.pass, 
      }
    });
  },
  // 
  _send_by_day: function() {
    var me = this;
    var h = new Date().getHours();
    setInterval(function () {
      if (h==me.conf.h) {
        me._send();
      }
    },1000*3600);
  },
  // ===========================================
  _send: function() {
    var me = this;
    // 拿到所有用户
    me._all_user()
      .then(function(arr) {
        // 全部发送
        return Promise.all(arr)
      })
      .then(function(results) {
        console.log(results);
      });
  },
  // 用户获取全部计划数据
  _all_user: function() {
    var me = this;
    // 收集所有的promise对象
    var all_send_arr = [];

    return new Promise(function(resolve, reject) {
      me.User_model
        .find()
        .then(function(arr) {

          arr.forEach(function(ele, index) {
            all_send_arr.push(me._send_one({
              email: ele.email,
              str: me._get_plan_str(ele.todays),
            }));
          });
          // 传递出去
          resolve(all_send_arr);
        });

    });
  },
  // 发送一个
  _send_one: function(obj) {
    var me = this;
    return new Promise(function(resolve, reject) {

      me.transporter.sendMail({
        // 发送者
        from: conf.user,
        // 接受者,可以同时发送多个,以逗号隔开
        to: obj.email,
        // 标题
        subject: `${FN.f_miao_str(Date.parse(new Date()), true)} 复习计划`,
        //text: 'Hello world', 
        html: obj.str
      }, function(err, info) {
        if (err) {
          console.log(err);
          return;
        }
        resolve(info);
      });
    });
  },
  // 用户计划的HTML
  _get_plan_str: function(obj) {
    obj = JSON.parse(obj);
    var HTML = '';
    for (var key in obj) {
      if (obj[key] != 0) {
        HTML += `<h2>计划${key}--->第 ${obj[key]} 轮复习</h2>`;
      }
    }
    return HTML;
  },
};


module.exports = Module;
//
