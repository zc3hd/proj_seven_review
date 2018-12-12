import all_data from './test_data.js';
// plans_data.arr.length = 0;


export default {
  components: {},
  data: function() {
    return {
      // =================================
      // 所有的配置项
      conf: {
        admin_id: "5c10a987ef30715734599b4d",

        layer_show: false,
        // 
        list: [],
      },
      // api
      api: {
        // 
        list: "/api/user/list.do",
        // 
        ad_upd: "/api/user/ad_upd.do",
        // 
        del: "/api/user/del.do",
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

        _id: '',
      },
    }
  },
  // x的公共数据
  computed: {

  },
  // 数据监听
  watch: {},
  // 初始函数
  mounted: function() {
    var me = this;


    me.init();
  },
  // 
  methods: {
    init: function() {
      var me = this;
      var admin_id = window.sessionStorage.getItem("_id");
      // 是没有权限访问这个页面的
      if (admin_id == null) {
        me.$ele_msg.error('您没有权限获访问该页面');
        setTimeout(function() {
          window.location.href = '/modules/page_plans/index.html';
        }, 1500);
      }
      // 初始化
      else {
        me.conf.admin_id = admin_id;
        me.list();
      }
    },
    list: function() {
      var me = this;
      me.$ajax
        .post(me.api.list, {
          admin_id: me.conf.admin_id
        })
        .then(function(data) {
          // 没有权限

          data = data.data;
          if (data.res == -1) {
            me.$ele_msg.error('没有权限获取用户列表');
            window.location.href = '/';
            return;
          }
          me.conf.list = data;

          // 渲染数据
          var plans_arr = [];
          me.conf.list.forEach(function(ele, index) {
            plans_arr = [];
            ele.plans.forEach(function(plan, index) {
              plans_arr.push(plan.name);
            });
            ele.plans = plans_arr.join(",");
          });

        });
    },
    // upd 弹窗
    upd: function(ele) {
      var me = this;
      me.conf.layer_show = true;

      me.user_layer._id = ele._id;
      me.user_layer.name = ele.name;
      me.user_layer.ps = ele.ps;
      me.user_layer.email = ele.email;

      me.user_layer.plans_limit = ele.plans_limit;
      me.user_layer.email_key = ele.email_key ? "1" : "0";
    },
    save: function() {
      var me = this;

      me.$ajax
        .post(me.api.ad_upd, {
          admin_id: me.conf.admin_id,
          _id: me.user_layer._id,
          plans_limit: me.user_layer.plans_limit,
          email_key: me.user_layer.email_key,
        })
        .then(function(data) {
          data = data.data;
          if (data.res == -1) {
            me.$ele_msg.error('没有权限修改用户数据');
            window.location.href = '/';
            return;
          }
          me.conf.layer_show = false;
          me.list();
        });
    },
    del: function(ele) {
      var me = this;

      me.$ajax
        .post(me.api.del, {
          admin_id: me.conf.admin_id,
          _id: ele._id,
        })
        .then(function(data) {
          data = data.data;
          if (data.res == -1) {
            me.$ele_msg.error('没有权限修改用户数据');
            window.location.href = '/';
            return;
          }
          me.list();
        });
    },


  },
};
