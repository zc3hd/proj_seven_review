import plans_data from './test_data.js';
// plans_data.arr.length = 0;

// =============================================自己组件
// login
const cpt_login = resolve => require([
  '../../login/index.vue'
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
        now_str: '',
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
        item: {
          style: {},
        },
      },

      // 弹窗中数据
      layer: {
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
        id: -1,
      },
      // api
      api: {},
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
        this.__init();
      }
    },
  },
  // 初始函数
  mounted: function() {
    var me = this;

    // 
    me._bg();
  },
  // 
  methods: {
    // 显示
    _layer_show: function() {
      var me = this;
      // 显示
      me.layer.show = true;
      // blur
      me.str.class_blur = 'box_blur';
      // 动画显示
      me.layer.class_animate = 'zoomInLeft';
    },
    // 关闭
    _layer_hide: function() {
      var me = this;
      // 动画离开
      me.layer.class_animate = 'zoomOutRight';

      setTimeout(function() {
        // 
        me.layer.show = false;
        // blur
        me.str.class_blur = '';

        me.__init();
      }, 1000);
    },

    // =====================================列表的ev
    // 新增
    ev_add: function() {
      var me = this;

      // 没有开启之前是不能用该函数的
      if (!me.$x_add_ev) {
        return;
      }

      me._layer_show();

      // 删除按钮
      me.layer.del_show = false;

      // 操作
      me.str.ev_type = 'add';
    },
    // 修改删除
    ev_upd: function(obj) {
      var me = this;
      me._layer_show();
      // 删除按钮显示
      me.layer.del_show = true;


      me.layer.name = obj.name;
      me.layer.sum = obj.sum;
      me.layer.date = obj.date;
      me.layer.id = obj.id;

      me.str.ev_type = 'upd';
    },

    // =====================================弹窗的ev
    // 
    ev_save: function() {
      var me = this;


      if (me.layer.name == '') {
        me.$ele_msg.error('name不能为空');
        return;
      }
      if (me.layer.sum <= 1) {
        me.$ele_msg.error('复习轮次不能小于2次');
        return;
      }
      if (me.layer.sum > 15) {
        me.$ele_msg.error('复习轮次不能大于15次');
        return;
      }
      if (me.layer.date == "") {
        me.$ele_msg.error('请选择计划开始时间');
        return;
      }
      if (FN.f_str_miao(FN.f_miao_str(Date.parse(me.layer.date), true)) > FN.f_str_miao(me.conf.now_str)) {
        me.$ele_msg.error('不能选择未来的时间');
        me.layer.date = '';
        return;
      }

      switch (me.str.ev_type) {
        case "add":
          var obj = {
            id: Math.random(),
            name: me.layer.name,
            sum: me.layer.sum,
            date: FN.f_miao_str(Date.parse(me.layer.date), true),
          };
          // 原始数组改变
          plans_data.arr.push(obj);
          break;
          // 
        case "upd":
          plans_data.arr.forEach(function(ele, index) {
            if (ele.id == me.layer.id) {
              ele.name = me.layer.name;
              ele.sum = me.layer.sum;
              ele.date = me.layer.date;
            }
          });
          break;
      }


      me.__init();

      me.layer.name = '';
      me.layer.sum = 5;
      me.layer.date = '';
      me.layer.id = -1;

      // console.log(plans_data.arr);
      me._layer_hide();
    },
    ev_del: function() {
      var me = this;

      var _index = 0;
      plans_data.arr.forEach(function(ele, index) {
        if (ele.id == me.layer.id) {
          _index = index;
        }
      });
      plans_data.arr.splice(_index, 1);


      me.layer.name = '';
      me.layer.sum = 5;
      me.layer.date = '';
      me.layer.id = -1;


      me._layer_hide();
    },
    ev_close: function() {
      var me = this;
      me._layer_hide();
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


    // 
    __init: function() {
      var me = this;

      // 清除本地数据数组
      me.conf.plans_arr.length = 0;

      // 得到now的时间 str
      me._init_data_now();
      // 初始化每组数据的间隔
      me._init_all_jianGe();
      // 每项数据集中生成
      me._item_all_obj();

      // 大数组生成
      me._all_obj();

      // 表的一些属性
      me._list();
    },
    // =======================================
    // 得到现象的时间 str
    _init_data_now: function() {
      var me = this;
      // 当前时间的秒数
      var miao = Date.parse(new Date());
      // 得到现在的日期 str
      me.conf.now_str = FN.f_miao_str(miao, true);
    },
    // 初始化每组数据的间隔
    _init_all_jianGe: function() {
      var me = this;

      var new_ele = null;
      plans_data.arr.forEach(function(ele, index) {
        new_ele = me._init_one_jianGe(ele);
        me.conf.plans_arr.push(new_ele);
      });

    },
    // 一条数据的间隔
    _init_one_jianGe: function(ele) {
      var me = this;
      var new_ele = {};
      new_ele.id = ele.id;
      new_ele.name = ele.name;
      new_ele.date = ele.date;
      new_ele.sum = ele.sum;

      var day = 1;
      var review_jg_arr = [];
      for (var i = 0; i < new_ele.sum; i++) {
        review_jg_arr.push(day);
        // 下一次的数据
        day = day * 2;
        switch (day) {
          case 8:
            day = 7;
            break;
          case 14:
            day = 15;
            break;
        }
      }
      new_ele.jg_days = review_jg_arr;
      return new_ele;
    },

    // =======================================
    // 每项数据生成
    _item_all_obj: function() {
      var me = this;
      // 
      me.conf.plans_arr.forEach(function(ele, index) {
        // me._item_one_data(ele.name, FN.f_str_miao(ele.date));
        me._item_one_data(ele);

      });
    },
    // 每项复习日期的生成
    _item_one_data: function(obj) {
      var me = this;
      // 新的戳
      var new_chuo = 0;
      var new_str = '';
      // 收集每项日期的 数组
      var new_str_arr = [];

      // 复习周期
      obj.jg_days.forEach(function(ele, index) {

        // 新的戳
        new_chuo = FN.f_str_miao(obj.date) + 24 * 3600000 * (ele - 1);
        // 新日期str
        new_str = FN.f_miao_str(new_chuo, true);

        // 新的字符串数组
        new_str_arr.push(new_str);
      });
      // 本对象挂载
      obj.jg_date = new_str_arr;

      return obj;
    },


    // =======================================
    // 大数组生成
    _all_obj: function() {
      var me = this;
      me.conf.plans_arr.forEach(function(ele, index) {
        me._all_from_one(ele.jg_date);
      });
      // 排序
      me.conf.all_chuo_arr.sort();
    },
    // 每项的不重复填入
    _all_from_one: function(arr) {
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
    _list: function() {
      var me = this;

      var w = 0;

      // 今天有任务
      if (me.conf.all_chuo_arr.indexOf(me.conf.now_str) != -1) {
        w = (me.conf.all_chuo_arr.length - 1) * me.conf.title_sp_w + me.conf.title_sp_w_now + 'px';
      }
      // 
      else {
        w = me.conf.all_chuo_arr.length * me.conf.title_sp_w + 'px';
      }

      // 每个单元的样式
      me.str.item.style = {
        "width": w
      };


      $('#table').niceScroll({
        cursorcolor: '#ccc',
        autohidemode: false,
        cursorborder: '1px solid #ccc'
      });

    },

    // =======================================
    // 每一项的样式
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
      var name = '';
      var key = obj.jg_date.indexOf(ele);
      // 没
      if (key == -1) {
        name = '';
      }
      // 有这个元素
      else {
        name = obj.name;
      }
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
    }
  },
};
