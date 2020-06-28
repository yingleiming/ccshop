import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"

//1.引用FastClick
import FastClick from "fastclick"
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

//2.引用全局样式
import "./style/common.less"

//3.引入ui组件库-Vant Weapp
import "./plugins/vant"

//4.引入rem
import "./config/rem.js"

//5.引入过滤器
import "./config/filters"

//6.引入二维码生成器插件
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
