import plans_data from './test_data.js';

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
        // 复习总数
        review_sum: 6,



        // 时间chuo数组
        all_chuo_arr: [],


        // ============================
        // 每个项目的字符串数组收集
        task_date_obj: {},


        // ============================
        // 今天的日期str
        now_str: '',
        // 复习的天数间隔
        review_jg_arr: [],

      },
      // api
      api: {},
    }
  },
  // 初始函数
  mounted: function() {
    var me = this;

    // 初始化数据
    me._init_data();

    // 每项数据集中生成
    me._item_all_obj();

    // 大数组生成
    me._all_obj();


    // 生成大标题
    me._title();


    // 初始化每条数据
    me._list();



    me._bg();

  },
  // 
  methods: {
    _bg:function () {
      var me = this;
      var class_str = $('#app').attr('class');
      class_str =class_str.split(" ");
      class_str[1] = "bg_"+Math.floor(Math.random()*7);
      if (class_str[1]=='bg_0') {
        class_str[1] = "bg_7";
      }
      class_str = class_str.join(" ");
      $('#app').attr('class',class_str);

      setTimeout(function  (argument) {
        me._bg();
      },10000);
    },
    // ================================================================
    // 初始化一些参数
    _init_data: function() {
      var me = this;
      // 得到now的时间 str
      me._init_data_now();

      // 初始化复习的天数的间隔数组
      me._init_data_jianGe_arr();
    },
    // 得到现象的时间 str
    _init_data_now: function(argument) {
      var me = this;

      var miao = Date.parse(new Date());

      // 得到现在的日期 str
      me.conf.now_str = FN.f_miao_str(miao, true);
    },
    // 间隔天数
    _init_data_jianGe_arr: function() {
      var me = this;
      var day = 1;
      for (var i = 0; i < me.conf.review_sum; i++) {
        me.conf.review_jg_arr.push(day);
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

      console.log(me.conf.review_jg_arr);
    },


    // ================================================================
    // 每项数据生成
    _item_all_obj: function(argument) {
      var me = this;
      // 
      plans_data.forEach(function(ele, index) {
        me._item_one_data(ele.name, FN.f_str_miao(ele.date));
      });
    },
    // 每项复习日期的生成
    _item_one_data: function(name, chuo) {
      var me = this;
      // 新的戳
      var new_chuo = 0;
      var new_str = '';
      // 收集每项日期的 数组
      var new_str_arr = [];

      // 复习周期
      me.conf.review_jg_arr.forEach(function(ele, index) {

        // ===========================================
        // 新的戳
        new_chuo = chuo + 24 * 3600000 * (ele - 1);
        // 新日期str
        new_str = FN.f_miao_str(new_chuo, true);
        // 新的字符串数组
        new_str_arr.push(new_str);
      });
      // 全局挂载
      me.conf.task_date_obj[name] = new_str_arr;

      return new_str_arr;
    },



    // ================================================================
    // 大数组生成
    _all_obj: function() {
      var me = this;
      for (var name in me.conf.task_date_obj) {
        me._all_from_one(me.conf.task_date_obj[name])
      }
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
    _title: function() {
      var me = this;
      var str = '';

      // 
      me.conf.all_chuo_arr.forEach(function(ele, index) {
        str += `<div class="sp_box">
                  <span class=${me._class_name(ele)}>${ele}</span>
                </div>`;
      });

      // 标题的容器
      $('#title')
        .css('width', (me.conf.all_chuo_arr.length - 1) * me.conf.title_sp_w + me.conf.title_sp_w_now + 'px')
        .html(str);

    },


    // ================================================================
    _list: function() {
      var me = this;
      for (var item in me.conf.task_date_obj) {
        me._list_one(item, me.conf.task_date_obj[item]);
      }


      $('#table').niceScroll({
        cursorcolor: '#ccc',
        autohidemode: false,
        cursorborder: '1px solid #ccc'
      });


      // 正常
      $('#table>.item>div').css('width', me.conf.title_sp_w + 'px');
      // now
      $('#table>.item>div>.now')
        .parent()
        .css('width', me.conf.title_sp_w_now + 'px');

    },
    _list_one: function(name, arr) {
      var me = this;

      var str = ``;
      var class_name = '';

      // 全部日期进行循环
      var key = null;
      me.conf.all_chuo_arr.forEach(function(ele, index) {
        key = arr.indexOf(ele);

        // 没
        if (key == -1) {
          str += `<div class="sp_box">
                    <span class=${me._class_name(ele)}></span>
                  </div>`;
        }
        // 有这个元素
        else {
          str += `<div class="sp_box">
                    <span class=${me._class_name(ele)}>${name}</span>
                  </div>`;
        }
      });

      $('#table')
        .append(`
          <div class="item" style='width:${(me.conf.all_chuo_arr.length - 1) * me.conf.title_sp_w + me.conf.title_sp_w_now }px'>
            ${str}
          </div>`);
    },




    // ================================================================
    _class_name: function(ele) {
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





  },
}
