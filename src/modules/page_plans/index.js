// import Vue from 'vue';

// ================================================路由
// 路由
// import VueRouter from 'vue-router';
// Vue.use(VueRouter);

// // 路由
// import routes from './router.config.js';
// var router = new VueRouter({
//   mode:'history',
//   scrollBehavior: () => ({ y: 0 }),
//   routes: routes
// });
// ================================================ele_UI
import { DatePicker,Message,Radio,TimePicker } from 'element-ui';
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(TimePicker);
Vue.prototype.$ele_msg = Message;
// ================================================vuex
import store from './store.js';



// ================================================axios
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$ajax = axios;

// 根组件
import App from './main/index.vue';
new Vue({

  el: '#app',
  // 这样的模式可以先测试为单个模块
  render: h => h(App),
  // router: router,
  // =====================vuex
  store:store,
});

