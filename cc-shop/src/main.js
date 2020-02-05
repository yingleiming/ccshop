import Vue from 'vue'
import App from './App.vue'
import FastClick from "fastclick"

//1.引用FastClick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
//2.引用全局样式
import "./style/common.less"
//3.引入路由
import routes from "./router/index"

new Vue({
  routes,
  render: h => h(App),
}).$mount('#app')
