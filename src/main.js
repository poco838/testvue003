import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import axios from 'axios';
import request from './utils/request';
import { Message } from 'element-ui'
Vue.config.productionTip = false
Vue.use(ElementUI, {size:"mini"});
Vue.prototype.$message = Message 
Vue.prototype.request=request


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
