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

  // 当前日期
  me.now_date_str = FN.f_miao_str(Date.parse(new Date()), true);

  // 当前时间
  me.now_time_str = FN.f_HHmm();


  // 邮件服务
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
    setInterval(function() {
      // 当前时间
      me.now_time_str = FN.f_HHmm();

      // 
      me._send();
      
    }, 1000 * 60);

    
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
          // 一个用户的数据
          me._send_one_user(user);
        });


      });
  },
  // 一个用户的数据
  _send_one_user: function(user) {
    var me = this;

    // 没有计划的用户不发
    if (user.plans.length == 0) {
      return;
    }

    // 一个用户的所有计划计划
    user
      .plans.forEach(function(plan, index) {

        // 复习计划中 没有 今天的计划--->不发送
        if (plan.jg_date.indexOf(me.now_date_str) == -1) {
          return;
        }

        //  今天有计划 时间不对--->不发送
        if (FN.f_HHmm(plan.note_time) != me.now_time_str) {
          return;
        }

        me._send_one_user_plan({
          email: user.email,
          str: `<h2>计划${plan.name}--->第 ${plan.jg_date.indexOf(me.now_date_str)+1} 轮复习</h2>`,
        });
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

};


module.exports = Module;
//
