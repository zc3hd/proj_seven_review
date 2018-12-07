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
    sign:function () {
      var me = this;
      // 登录成功
      me.$store.commit('sign_suc', {});
    },



  },
}
