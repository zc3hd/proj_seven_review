import plans_data from './test_data.js';

import { DatePicker } from 'element-ui';
Vue.use(DatePicker);
import { Message } from 'element-ui';


export default {
  // name: 'main_app',
  data: function() {
    return {
      // 所有的配置项
      conf: {
        // ============================
        // 标题的span的宽
        title_sp_w: 120,
        // 当前的任务
        title_sp_w_now: 160,


        // ============================
        // 所有复习项目的时间str数组
        all_chuo_arr: [],

        // ============================
        // 今天的日期str
        now_str: '',

        // 所有的数据
        plans_data: plans_data,
      },
      // 列表中的所有项目
      all: {
        // 每一行的宽
        item: {
          style: null,
        },
        // 背景
        bg_name: '',

        // 模糊
        blur: ''
      },
      // 弹窗中数据
      layer: {
        // 
        show: false,
        box_class: 'box_none',
        // 删除标志
        del_show: false,
        // 
        name: '',
        sum: 5,
        date: '',
      },
      // api
      api: {},
    }
  },
  // 初始函数
  mounted: function() {
    var me = this;

    me.cc_init();


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
      me.all.blur = 'box_blur';
      // 动画显示
      me.layer.box_class = 'zoomInLeft';
    },
    // 隐藏
    _layer_hide: function() {
      var me = this;
      // 动画离开
      me.layer.box_class = 'zoomOutRight';

      setTimeout(function() {
        // 
        me.layer.show = false;
        // blur
        me.all.blur = '';

        me.cc_init();
      }, 1100);
    },

    // =====================================
    // 
    ev_add: function() {
      var me = this;
      me._layer_show();

      // 删除按钮
      me.layer.del_show = false;
    },
    // 
    ev_upd: function() {
      var me = this;
      me._layer_show();

      // 删除按钮
      me.layer.del_show = true;
    },


    // =====================================
    // 
    ev_save: function() {
      var me = this;


      if (me.layer.name == '') {
        Message.error('name不能为空');
        return;
      }
      if (me.layer.sum <= 1) {
        Message.error('复习轮次不能小于2次');
        return;
      }
      if (me.layer.date == "") {
        Message.error('请选择计划开始时间');
        return;
      }
      if (FN.f_str_miao(FN.f_miao_str(Date.parse(me.layer.date), true)) > FN.f_str_miao(me.conf.now_str)) {
        Message.error('不能选择未来的时间');
        me.layer.date = '';
        return;
      }


      // plans_data.push({
      //   name: me.layer.name,
      //   sum: me.layer.sum,
      //   date: FN.f_miao_str(Date.parse(me.layer.date), true),
      //   info: ``,
      // });


      me.layer.name = '';
      me.layer.sum = 5;
      me.layer.date = '';



      me._layer_hide();



    },

    ev_del: function() {
      var me = this;
      me._layer_hide();
    },
    ev_close: function() {
      var me = this;
      me._layer_hide();
    },






    // ==============================================================
    _bg: function() {
      var me = this;

      me.all.bg_name = "bg_" + Math.floor(Math.random() * 7);
      if (me.all.bg_name == 'bg_0') {
        me.all.bg_name = "bg_7";
      }


      setTimeout(function(argument) {
        me._bg();
      }, 10000);
    },

    cc_init: function(argument) {
      var me = this;

      // 初始化数据
      me._init_data();

      // 每项数据集中生成
      me._item_all_obj();

      // 大数组生成
      me._all_obj();


      // 表的一些属性
      me._list();
    },
    // ================================================================
    // 初始化一些参数
    _init_data: function() {
      var me = this;
      // 得到now的时间 str
      me._init_data_now();

      // 初始化每组数据的间隔
      me._init_all_jianGe();

      console.log(me.conf.plans_data);
    },
    // 得到现象的时间 str
    _init_data_now: function(argument) {
      var me = this;
      // 当前时间的秒数
      var miao = Date.parse(new Date());
      // 得到现在的日期 str
      me.conf.now_str = FN.f_miao_str(miao, true);
    },
    // 初始化每组数据的间隔
    _init_all_jianGe: function() {
      var me = this;
      // console.log(plans_data);
      me.conf.plans_data.forEach(function(ele, index) {
        me._init_one_jianGe(ele);
      });
    },
    // 
    _init_one_jianGe: function(ele) {
      var me = this;
      var day = 1;
      var review_jg_arr = [];
      for (var i = 0; i < ele.sum; i++) {
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
      ele.jg_days = review_jg_arr;
    },



    // ================================================================
    // 每项数据生成
    _item_all_obj: function(argument) {
      var me = this;
      // 
      me.conf.plans_data.forEach(function(ele, index) {
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
    },



    // ================================================================
    // 大数组生成
    _all_obj: function() {
      var me = this;
      me.conf.plans_data.forEach(function(ele, index) {
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


    // ================================================================
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

      me.all.item.style = {
        "width": w
      };


      $('#table').niceScroll({
        cursorcolor: '#ccc',
        autohidemode: false,
        cursorborder: '1px solid #ccc'
      });

    },









    // ================================================================
    fn_item_bg: function(ele) {
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
    fn_item_w: function(ele) {
      return {
        width: ele != this.conf.now_str ? this.conf.title_sp_w + 'px' : this.conf.title_sp_w_now + 'px',
      };
    },
    // 返回item的名字
    fn_item_name: function(ele, obj) {
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
    fn_item_lun: function(ele, obj) {
      var key = obj.jg_date.indexOf(ele);
      if (key == -1) {
        return;
      } else {
        return key + 1;
      }
    }






  },
}
