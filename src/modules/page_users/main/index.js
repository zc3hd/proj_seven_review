import all_data from './test_data.js';
// plans_data.arr.length = 0;





export default {
  components: {},
  data: function() {
    return {
      // =================================
      // 所有的配置项
      conf: {
        layer_show: false,
        layer_limit: 0,
      },
      // api
      api: {},
      // 
      data: {
        all: all_data
      }
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
    me.list();
  },
  // 
  methods: {
    _show: function() {
      var me = this;
      me.conf.layer_show = true;
    },
    _hide: function() {
      var me = this;
      me.conf.layer_show = false;
    },

    // upd
    upd: function(ele) {
      var me = this;
      me._show();
      me.conf.layer_limit = ele.plans_limit;
    },
    del: function(ele) {
      var me = this;
    },
    list: function() {
      var me = this;
      all_data.forEach(function(ele, index) {
        ele.plans = ele.plans.join("、");
      });
      me.data.all = all_data;
    },



    save: function() {
      var me = this;
      me._hide();
    },
    close: function() {
      var me = this;
      me._hide();
    },



  },
};
