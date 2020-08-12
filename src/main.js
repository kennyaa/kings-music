import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import fastClick from 'fastclick'
import "babel-polyfill"

//解决移动端延时300ms
fastClick.attach(document.body)

//引入图片懒加载的地址
import image from "./assets/img/loading.gif"

//使用图片懒加载
Vue.use(VueLazyload,{
  loading:image
})

//创建事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
