import Vue from 'vue'
import App from './App'
import router from './router'

// 引用全局样式
import './assets/css/common.css'

// 引入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入全局基础样式
import '@/assets/css/base.css'

Vue.config.productionTip = false;
// 引入Cookie插件
let cookies = require('browser-cookies');

Vue.config.productionTip = false;

// 使用 ElementUI
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
