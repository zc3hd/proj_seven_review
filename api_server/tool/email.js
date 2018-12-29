// 邮件的配置
var conf = {
  user: '343371169@qq.com',
  pass: 'zgltsujynhrhbijg',
  time: "07:30",
};
// 全局工具函数
var FN = require('./common.js');



function Module() {
  var me = this;

  // 当前时间
  me.now_str = FN.f_miao_str(Date.parse(new Date()), true);
  // 
  me.nodemailer = require('nodemailer');
  // 用户模型
  me.User_model = require('../collection/user.js');
}
Module.prototype = {
  init: function() {
    var me = this;

    // 初始化邮件服务器
    me._init_emailSever();

    // 一直发送
    me._send_online();
  },
  // 初始化邮件服务器
  _init_emailSever: function() {
    var me = this;
    me.transporter = me.nodemailer.createTransport({
      service: 'qq',
      auth: {
        user: conf.user,
        pass: conf.pass,
      }
    });
  },
  // 一直发送
  _send_online: function() {
    var me = this;

    // 每分钟轮询一次
    // setInterval(function() {

    //   // 发生一次


    // }, 1000 * 60);
    me._send();
  },
  // 获取当前时间 H:m
  _get_time: function() {
    var h = new Date().getHours();
    var m = new Date().getMinutes();
    return `${FN.checkNum(h)}:${FN.checkNum(m)}`;
  },
  // ===========================================
  _send: function() {
    var me = this;

    // 拿到所有用户的信息
    me.User_model
      .find()
      .populate({
        path: "plans",
      })
      .then(function(user_arr) {

        // 
        user_arr.forEach(function(user, index) {
          // console.log(user.plans);
          me._send_one_user(user);
        });


      });
  },
  // 一个用户的数据
  _send_one_user: function(user) {
    var me = this;

    // 没有计划的不发
    if (user.plans.length == 0) {
      return;
    }

    // 一个用户的计划
    user.plans.forEach(function(plan, index) {

      // 今天有复习计划发送
      if (plan.jg_date.indexOf(me.now_str) != -1) {
        me._send_one_user_plan({
          email: user.email,
          str: `<h2>计划${plan.name}--->第 ${plan.jg_date.indexOf(me.now_str)+1} 轮复习</h2>`,
        });
      }
    });
  },
  // 发送一个计划
  _send_one_user_plan: function(obj) {
    var me = this;
    me.transporter.sendMail({
      // 发出的邮件
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
    });
  },

  // // 用户获取全部计划数据
  // _all_user: function() {
  //   var me = this;
  //   // 收集所有的promise对象
  //   var all_send_arr = [];

  //   return new Promise(function(resolve, reject) {


  //   });
  // },
  // // 发送一个
  // _send_one: function(obj) {
  //   var me = this;
  //   return new Promise(function(resolve, reject) {

  //     me.transporter.sendMail({
  //       // 发出的邮件
  //       from: conf.user,
  //       // 接受者,可以同时发送多个,以逗号隔开
  //       to: obj.email,
  //       // 标题
  //       subject: `${FN.f_miao_str(Date.parse(new Date()), true)} 复习计划`,
  //       //text: 'Hello world', 
  //       html: obj.str
  //     }, function(err, info) {
  //       if (err) {
  //         console.log(err);
  //         return;
  //       }
  //       resolve(info);
  //     });

  //   });
  // },
  // // 用户计划的HTML
  // _get_plan_str: function(obj) {
  //   obj = JSON.parse(obj);
  //   var HTML = '';
  //   for (var key in obj) {
  //     if (obj[key] != 0) {
  //       HTML += `<h2>计划${key}--->第 ${obj[key]} 轮复习</h2>`;
  //     }
  //   }
  //   return HTML;
  // },
};


module.exports = Module;
//
