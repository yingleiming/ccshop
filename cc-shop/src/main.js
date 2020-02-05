import Vue from 'vue'
import App from './App.vue'
<<<<<<< HEAD
=======
import FastClick from "fastclick"

//1.引用FastClick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
<<<<<<< HEAD

>>>>>>> dev

Vue.config.productionTip = false
=======
//2.引用全局样式
import "./style/common.less"
>>>>>>> dev

new Vue({
  render: h => h(App),
}).$mount('#app')
