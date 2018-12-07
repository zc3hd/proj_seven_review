// import Vue from 'vue';
// import Vuex from 'vuex';
Vue.use(Vuex);

// 初始化状态
var state = {
  // 主页中 新增按钮的名字
  add_btn_name: '',
  // 列表显示
  box_show: false,
  // 按钮的样式
  add_btn_class: "add_login",
  // add函数事件 是否响应
  add_ev: false,
  // 登录框是否显示
  login_box_show: true,
};

var mutations = {
  // 登录成功
  sign_suc: function(state, obj) {
    // add按钮样式
    state.add_btn_class = '';
    // name
    state.add_btn_name = 'add';
    // 登录框消失
    state.login_box_show = false;

    setTimeout(function(argument) {
      state.box_show = 'true';
      state.add_ev = true;
    },1100);

  },

};

export default new Vuex.Store({
  // getters: getters,
  state: state,
  // actions: actions,
  mutations: mutations,
});
