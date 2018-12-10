export default {
  // name: 'main_app',
  data: function() {
    return {
      // =================================
      // 所有的配置项
      conf: {},
      // 弹窗中数据
      obj: {
        // 
        name: '',
        ps: '',
      },
      // api
      api: {
        // 登录
        login: '/api/user/login.do',
      },
    }
  },
  // 初始函数
  mounted: function() {
    var me = this;

    // ***********************************登录
    // 
    // 
    // 
    me.$store.commit('user_suc', { _id: "5c0df786f5d482505c12d101" });
    // ***********************************登录
  },
  // 
  methods: {
    sign: function(key) {
      var me = this;

      if (me.obj.name == '') {
        me.$ele_msg.error('name不能为空');
        return;
      }
      if (me.obj.ps == '') {
        me.$ele_msg.error('ps不能为空');
        return;
      }


      // 登录
      me.$ajax
        .post(me.api.login, {
          name: me.obj.name,
          ps: me.obj.ps
        })
        .then(function(result) {
          result = result.data;
          if (result.res == -1) {
            me.$ele_msg.error(result.desc);
            return;
          }
          // 登录成功
          me.$store.commit('user_suc', { _id: result.data._id });
        });

      // 登录成功
      // 


    },



  },
}
