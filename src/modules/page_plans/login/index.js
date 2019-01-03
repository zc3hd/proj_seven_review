export default {
  // name: 'main_app',
  data: function() {
    return {
      // =================================
      // 所有的配置项
      conf: {
        key: "sign",
        // 
        item_h: {
          height: "50%",
        },
        // 
        item_info_lh: {
          lineHeight: "70px",
        },
        // 
        item_ipt_padding: {
          paddingTop: "20px",
          paddingBottom: '20px'
        },
      },
      // 弹窗中数据
      obj: {
        // 
        name: '',
        ps: '',
        email: "",
      },
      // api
      api: {
        // 登录
        login: '/api/user/login.do',
        // 注册
        register: '/api/user/register.do',
      },
    }
  },
  // 初始函数
  mounted: function() {
    var me = this;

    // ***********************************登录

    // me.$store.commit('user_suc', { _id: "5c27419613d3b3817c7612f1" });
    // ***********************************登录
  },
  // 
  methods: {
    // 
    ev: function() {
      var me = this;
      switch (me.conf.key) {
        case "sign":
          me.ev_sign();
          break;
        case "register":
          me.ev_register();
          break;
      }
    },
    // 登录
    ev_sign: function() {
      var me = this;

      if (me.obj.name == '') {
        me.$ele_msg.error('name can not null');
        return;
      }
      if (me.obj.ps == '') {
        me.$ele_msg.error('ps can not null');
        return;
      }


      // 登录
      me.$ajax
        .post(me.api.login, {
          name: me.obj.name,
          ps: me.obj.ps
        })
        .then(function(data) {
          // console.log(data);
          data = data.data;
          // 错误的时候
          if (data.res == -1) {
            me.$ele_msg.error(data.desc);
            return;
          }

          // user
          if (data.key!='king') {
            me.$store.commit('user_suc', { _id: data._id });
          }
          // admin得的 页面 转跳
          else {
            // sessionStorage关了就没有了。
            window.sessionStorage.setItem("_id", data._id);
            window.location.href = '/modules/page_users/index.html';
          }
        });
    },
    // 注册
    ev_register: function() {
      var me = this;

      if (me.obj.name == '') {
        me.$ele_msg.error('name can not null');
        return;
      }
      if (me.obj.name.length >= 10) {
        me.$ele_msg.error('name 不能超过10个字符');
        return;
      }

      if (me.obj.ps == '') {
        me.$ele_msg.error('ps can not null');
        return;
      }
      if (me.obj.ps.length >= 10) {
        me.$ele_msg.error('ps 不能超过10个字符');
        return;
      }

      if (me.obj.email == '') {
        me.$ele_msg.error('email can not null');
        return;
      }
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      if (!reg.test(me.obj.email)) {
        me.$ele_msg.error('email 格式不正确!');
        return;
      }

      // 登录
      me.$ajax
        .post(me.api.register, {
          name: me.obj.name,
          ps: me.obj.ps,
          email: me.obj.email,
        })
        .then(function(data) {
          data = data.data;
          // 错误的时候
          if (data.name == "MongoError") {
            me.$ele_msg.error(`用户名${me.obj.name}已被占用！`);
            me.obj.name = '';
            return;
          }
          // 
          me.$store.commit('user_suc', { _id: data._id });
        });
    },
    nav: function(key) {
      var me = this;
      me.conf.key = key;

      // 
      switch (key) {
        case "sign":
          me.conf.item_h.height = '50%';
          me.conf.item_info_lh.lineHeight = '70px';

          me.conf.item_ipt_padding.paddingTop = '20px';
          me.conf.item_ipt_padding.paddingBottom = '20px';

          break;
        case "register":
          me.conf.item_h.height = '33.3%';
          me.conf.item_info_lh.lineHeight = '53.27px';

          me.conf.item_ipt_padding.paddingTop = '12px';
          me.conf.item_ipt_padding.paddingBottom = '12px';
          break;
      }
    },
  },
}
