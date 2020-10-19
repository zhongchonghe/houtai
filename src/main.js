import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import './assets/fonts/iconfont.css'
import './assets/fonts/iconfont.css'
Vue.prototype.$http = axios
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/'

axios.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers.Authorization = window.localStorage.getItem('token')

  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
