import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'//引入路由
import {routes} from './routes' //抽离后引入路由组件
import axios from 'axios'//引入axios

import {store} from './store/store.js'//引入store[要在下面实例里面应用下]


Vue.use(VueRouter)//使用路由

//axios配置根路径，配置完请求就直接json文件就可以了
axios.defaults.baseURL = 'https://wd3406675684wibmtw.wilddogio.com/'

//配置Vue原型 (在任何组件中都可以正常使用axios)
Vue.prototype.http = axios
//Vue.prototype.$axios = axios


const router = new VueRouter({
  routes,
  mode:'history'
})


new Vue({
  el: '#app',
  router,
  store,//应用
  render: h => h(App)
})
