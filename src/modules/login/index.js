export default {
  // name: 'main_app',
  data: function() {
    return {
      // =================================
      // 所有的配置项
      conf: {
      },
      // 弹窗中数据
      obj: {
        // 
        name: '',
        ps: '',
      },
      // api
      api: {},
    }
  },
  // 初始函数
  mounted: function() {
    var me = this;
  },
  // 
  methods: {
    sign:function (key) {
      var me = this;

      // if (me.obj.name == '') {
      //   me.$ele_msg.error('name不能为空');
      //   return;
      // }
      // if (me.obj.ps == '') {
      //   me.$ele_msg.error('ps不能为空');
      //   return;
      // }

      // 登录成功
      me.$store.commit('user_suc', {});
    },



  },
}
