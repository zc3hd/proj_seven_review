import plans_data from './test_data.js';
// plans_data.arr.length = 0;

// =============================================自己组件
// login
const cpt_login = resolve => require([
  '../login/index.vue'
], resolve);




export default {
  components: {
    cpt_login: cpt_login,
  },
  data: function() {
    return {
      // =================================
      // 所有的配置项
      conf: {
        // ============================单元格
        // 标题的span的宽
        title_sp_w: 120,
        // 当前的任务
        title_sp_w_now: 160,

        // ============================列表的属性
        // 今天的日期str
        now_str: FN.f_miao_str(Date.parse(new Date()), true),
        // 所有复习项目的时间str的大数组
        all_chuo_arr: [],
        // 所有的计划数据
        plans_arr: [],
      },

      // str区
      str: {
        // ==================================name
        // 整个背景的类名
        class_bg: '',

        // 列表模糊的类名
        class_blur: '',

        // ==================================事件类型
        // 操作类型(区分是从add进入，还是upd进入，后面的逻辑不一样)
        ev_type: "",

        // ==================================单元格
        // 每个单元的样式
        heng_bar: {
          style: {},
        },
      },

      // 列表的弹窗中数据
      plan_layer: {
        // 是否显示
        show: false,
        // 删除标志是否显示
        del_show: false,

        // 动画样式
        class_animate: 'box_none',
        // 
        name: '',
        sum: 5,
        date: '',
        _id: -1,
      },

      // 用户的弹窗中数据
      user_layer: {
        // 是否显示
        show: false,
        // 
        name: '',
        email_key: 5,
        plans_limit: 0,

        ps: '',
        email: "",
      },

      // api
      api: {
        // 拿到计划数据
        list: '/api/plan/list.do',
        // 
        add: '/api/plan/add.do',
        // 
        upd: '/api/plan/upd.do',
        // 
        del: '/api/plan/del.do',
        // 标记
        mark: '/api/plan/mark.do',

        // 用户信息更新
        user_upd: '/api/user/upd.do',
      },
    }
  },
  // x的公共数据
  computed: {
    // 新增按钮的名字
    $x_add_btn_name: function() {
      return this.$store.state.add_btn_name;
    },
    // 列表显示
    $x_box_show: function() {
      return this.$store.state.box_show;
    },
    // 按钮的样式
    $x_add_btn_class: function() {
      return this.$store.state.add_btn_class;
    },
    // add函数事件 是否响应
    $x_add_ev: function() {
      return this.$store.state.add_ev;
    },
    // 登录框是否显示
    $x_login_box_show: function(argument) {
      return this.$store.state.login_box_show;
    },
  },
  watch: {
    // 登录成功后显示，页面初始化化
    $x_box_show: function(val, old_val) {
      if (val) {
        this._cc_init();
      }
    },
  },
  // 初始函数
  mounted: function() {
    var me = this;
    // 
    // me._bg();
  },
  // 
  methods: {
    // 计划弹窗显示
    _plan_layer_show: function() {
      var me = this;
      // 显示
      me.plan_layer.show = true;
      // blur
      me.str.class_blur = 'box_blur';
      // 动画显示
      me.plan_layer.class_animate = 'zoomInLeft';
    },
    // 计划弹窗关闭
    _plan_layer_hide: function() {
      var me = this;

      // 初始化参数
      me.plan_layer.name = '';
      me.plan_layer.sum = 5;
      me.plan_layer.date = '';
      me.plan_layer._id = -1;

      // 动画离开
      me.plan_layer.class_animate = 'zoomOutRight';

      setTimeout(function() {
        // 弹窗消失
        me.plan_layer.show = false;
        // blur
        me.str.class_blur = '';

        // 初始化数据
        me._cc_init();
      }, 1000);
    },

    // =====================================列表的ev
    // 新增
    ev_plan_add: function() {
      var me = this;

      // 没有开启之前是不能用该函数的
      if (!me.$x_add_ev) {
        return;
      }

      me._plan_layer_show();

      // 删除按钮
      me.plan_layer.del_show = false;

      // 操作
      me.str.ev_type = 'add';
    },
    // 修改或删除
    ev_plan_upd: function(obj) {
      var me = this;
      me._plan_layer_show();
      // 删除按钮显示
      me.plan_layer.del_show = true;


      me.plan_layer.name = obj.name;
      me.plan_layer.sum = obj.sum;
      me.plan_layer.date = obj.date;
      me.plan_layer._id = obj._id;

      // console.log(obj);

      me.str.ev_type = 'upd';
    },
    // 
    ev_plan_save: function() {
      var me = this;
      var obj = {};
      var api_url = '';

      if (me.plan_layer.name == '') {
        me.$ele_msg.error('name不能为空');
        return;
      }
      if (me.plan_layer.sum <= 1) {
        me.$ele_msg.error('复习轮次不能小于2次');
        return;
      }
      if (me.plan_layer.sum > 15) {
        me.$ele_msg.error('复习轮次不能大于15次');
        return;
      }
      if (me.plan_layer.date == "") {
        me.$ele_msg.error('请选择计划开始时间');
        return;
      }
      if (FN.f_str_miao(FN.f_miao_str(Date.parse(me.plan_layer.date), true)) > FN.f_str_miao(me.conf.now_str)) {
        me.$ele_msg.error('不能选择未来的时间');
        me.plan_layer.date = '';
        return;
      }
      // 先拿到数据
      obj = {
        user_id: me.$store.state._id,
        name: me.plan_layer.name,
        sum: me.plan_layer.sum,
        date: FN.f_miao_str(Date.parse(me.plan_layer.date), true),
      };
      switch (me.str.ev_type) {
        case "add":
          // *****************************************************测试数据
          // var obj = {
          //   id: Math.random(),
          //   name: me.plan_layer.name,
          //   sum: me.plan_layer.sum,
          //   date: FN.f_miao_str(Date.parse(me.plan_layer.date), true),
          // };
          // // 原始数组改变
          // plans_data.arr.push(obj);
          // *****************************************************测试数据
          api_url = me.api.add;
          me.ev_plan_save_ajax(api_url, obj);
          break;
          // 
        case "upd":
          // *****************************************************测试数据
          // plans_data.arr.forEach(function(ele, index) {
          //   if (ele.id == me.plan_layer._id) {
          //     ele.name = me.plan_layer.name;
          //     ele.sum = me.plan_layer.sum;
          //     ele.date = me.plan_layer.date;
          //   }
          // });
          // *****************************************************测试数据
          api_url = me.api.upd;
          obj._id = me.plan_layer._id;
          me.ev_plan_save_ajax(api_url, obj);
          break;
      }
    },
    // 
    ev_plan_save_ajax: function(api, obj) {
      var me = this;
      me.$ajax
        .post(api, obj)
        .then(function(data) {
          data = data.data;
          // 判断
          switch (me.str.ev_type) {
            case "add":
              // console.log(data);
              if (data.ret == -1) {
                me.$ele_msg.error(`您已达到计划界值${data.plans_limit}，如需扩增，请联系管理员!`);
              }
              break;
          }
          me._plan_layer_hide();
        });
    },
    // 删除
    ev_plan_del: function() {
      var me = this;

      // *********************************************测试数据
      // var _index = 0;
      // plans_data.arr.forEach(function(ele, index) {
      //   if (ele.id == me.plan_layer._id) {
      //     _index = index;
      //   }
      // });
      // plans_data.arr.splice(_index, 1);
      // *********************************************测试数据
      me.$ajax
        .post(me.api.del, {
          _id: me.plan_layer._id,
          user_id: me.$store.state._id,
        })
        .then(function() {
          me._plan_layer_hide();
        });
    },
    // 关闭
    ev_plan_close: function() {
      var me = this;
      me._plan_layer_hide();
    },


    // =====================================用户信息
    ev_user: function() {
      var me = this;
      me.user_layer.show = true;
    },
    // 保存按钮
    ev_user_save: function() {
      var me = this;
      if (me.user_layer.ps == '') {
        me.$ele_msg.error('ps can not null');
        return;
      }
      if (me.user_layer.ps.length >= 10) {
        me.$ele_msg.error('ps 不能超过10个字符');
        return;
      }

      if (me.user_layer.email == '') {
        me.$ele_msg.error('email can not null');
        return;
      }
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      if (!reg.test(me.user_layer.email)) {
        me.$ele_msg.error('email 格式不正确!');
        return;
      }

      me.$ajax
        .post(me.api.user_upd, {
          _id: me.$store.state._id,
          ps: me.user_layer.ps,
          email: me.user_layer.email,
        })
        .then(function(res) {
          me.$ele_msg({
            message: '修改数据成功',
            type: 'success'
          });
          me.user_layer.show = false;
        });
    },
    ev_user_close: function() {
      window.location.href = '/';
    },




    // ============================================================
    _cc_init: function() {
      var me = this;


      // 获取数据
      me.$ajax
        .post(me.api.list, {
          _id: me.$store.state._id
        })
        .then(function(res) {
          var data = res.data.data;
          // console.log(data);

          // 提醒添加数据
          if (data.plans.length == 0) {
            me.$ele_msg.error('没有学习计划了？快去添加吧!');
            return;
          }

          // 拿到线上数据
          me.conf.plans_arr = data.plans;
          // 大标题的日期
          me.conf.all_chuo_arr.length = 0;
          // 大标题的日期生成
          me._all_obj();

          // 表的一些属性
          me._list();


          // 用户信息用的属性
          me.user_layer.name = data.name;
          // 计划限制
          me.user_layer.plans_limit = data.plans_limit;
          // 邮件开关
          me.user_layer.email_key = data.email_key;
          // 密码
          me.user_layer.ps = data.ps;
          // 邮件
          me.user_layer.email = data.email;
        });
    },
    // 大数组标题的生成
    _all_obj: function() {
      var me = this;
      me.conf.plans_arr.forEach(function(ele, index) {
        me._all_obj_one(ele.jg_date);
      });
      // 排序
      me.conf.all_chuo_arr.sort();
    },
    // 每项的不重复填入
    _all_obj_one: function(arr) {
      var me = this;
      // 戳在大数组中的标识
      var chuo_key = null;
      arr.forEach(function(ele, index) {
        chuo_key = me.conf.all_chuo_arr.indexOf(ele);
        // 没有这个日期
        if (chuo_key == -1) {
          me.conf.all_chuo_arr.push(ele);
        }
      });
    },



    // =======================================
    // 每一项的背景
    list_item_bg: function(ele) {
      var me = this;
      var ele_s = FN.f_str_miao(ele);
      var now_s = FN.f_str_miao(me.conf.now_str);

      var class_name = '';
      // 过去
      if (ele_s < now_s) {
        class_name = 'done';
      }
      // 当前时间
      else if (ele_s == now_s) {
        class_name = "now";
      }
      // 将来
      else {
        class_name = "will";
      }
      return class_name;
    },
    // 返回item的宽
    list_item_w: function(ele) {
      return {
        width: ele != this.conf.now_str ? this.conf.title_sp_w + 'px' : this.conf.title_sp_w_now + 'px',
      };
    },
    // 返回item的名字
    list_item_name: function(ele, obj) {
      var me = this;
      var name = '';

      // 大集合里没有当前这个计划的日期
      var key = obj.jg_date.indexOf(ele);
      
      // 没有这个计划
      if (key == -1) {
        name = '';
      }
      // 有这个元素
      else {
        name = obj.name;
      }

      // // 这个日期有数据
      // if (ele == me.conf.now_str) {
      //   me.conf.plans_today[obj.name] = key + 1;
      // }


      return name;
    },
    // 返回轮数
    list_item_lun: function(ele, obj) {
      var key = obj.jg_date.indexOf(ele);
      if (key == -1) {
        return;
      } else {
        return key + 1;
      }
    },
    _list: function() {
      var me = this;

      var w = 0;

      // 今天有任务
      if (me.conf.all_chuo_arr.indexOf(me.conf.now_str) != -1) {
        w = (me.conf.all_chuo_arr.length - 1) * me.conf.title_sp_w + me.conf.title_sp_w_now + 'px';
      }
      // 没有任务的宽度
      else {
        w = me.conf.all_chuo_arr.length * me.conf.title_sp_w + 'px';
      }

      // 每个横条的样式宽度
      me.str.heng_bar.style = {
        "width": w
      };


      $('#table').niceScroll({
        cursorcolor: '#ccc',
        autohidemode: false,
        cursorborder: '1px solid #ccc'
      });

    },



    // =======================================
    _bg: function() {
      var me = this;

      me.str.class_bg = "bg_" + Math.floor(Math.random() * 7);
      if (me.str.class_bg == 'bg_0') {
        me.str.class_bg = "bg_7";
      }


      setTimeout(function(argument) {
        me._bg();
      }, 10000);
    },





  },
};
