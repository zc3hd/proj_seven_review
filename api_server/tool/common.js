/**
 * Created on 2017/12/13 BY zhanghongc
 */
module.exports = {
  //-------------------------------------------------数字保留两位小数 
  toDecimal: function(obj) {
    if (isNaN(obj.value)) {
      obj.value = ""
    } else {
      if (obj.getAttribute("data-name") == 1) {
        if (obj.value >= 1000) {
          obj.value = "999.99"
        }
      }
      obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    }
  },
  //-------------------------------------------------时间戳转日期
  f_miao_str: function(date, flag) {
    var me = this;
    if (!date) {;
      return false;
    } else {
      if (flag && flag == true) {
        var dt = new Date(date);
        return (dt.getFullYear() + "-" + me.checkNum(dt.getMonth() + 1) + "-" + me.checkNum(dt.getDate()));
      } else {
        var dt = new Date(date);
        return (dt.getFullYear() + "-" + me.checkNum(dt.getMonth() + 1) + "-" + me.checkNum(dt.getDate()) + " " + me.checkNum(dt.getHours()) + ":" + me.checkNum(dt.getMinutes()) + ':' + me.checkNum(dt.getSeconds()));
      }
    }
  },
    //日期转时间戳
  f_str_miao: function(str) {
    var me = this;
    var ser = new Date(str);
    var miao = Date.parse(ser);
    return miao;
  },
  // 时间转时分
  f_HHmm:function  (time) {
    var me = this;
    if (time) {
      return `${me.checkNum(new Date(time).getHours())}:${me.checkNum(new Date(time).getMinutes())}`;
    }
    return `${me.checkNum(new Date().getHours())}:${me.checkNum(new Date().getMinutes())}`;
  },
  checkNum: function(num) {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  },
  //-------------------------------------------------时间戳转日期
  formatterDateDay: function(date, flag) {
    var me = this;
    if (!date) {;
      return false;
    } else {
      if (flag && flag == true) {
        var dt = new Date(date);
        return (dt.getFullYear() + "-" + me.reset_Num(dt.getMonth() + 1) + "-" + me.reset_Num(dt.getDate()));
      } else {
        var dt = new Date(date);
        return (dt.getFullYear() + "-" + me.reset_Num(dt.getMonth() + 1) + "-" + me.reset_Num(dt.getDate()) + " " + me.reset_Num(dt.getHours()) + ":" + me.reset_Num(dt.getMinutes()) + ':' + me.reset_Num(dt.getSeconds()));
      }
    }
  },
  // 转时分
  f_s_f: function(date) {
    var me = this;
    if (!date) {;
      return "无最新时间";
    } else {

      var dt = new Date(date);
      return (dt.getFullYear() + "-" + me.reset_Num(dt.getMonth() + 1) + "-" + me.reset_Num(dt.getDate()) + " " + me.reset_Num(dt.getHours()) + ":" + me.reset_Num(dt.getMinutes()));
    }
  },
  reset_Num: function(num) {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  },

};
