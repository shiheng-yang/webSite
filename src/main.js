import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// element挂载
Vue.use(ElementUI)
// 严格模式
Vue.config.productionTip = false
import { formatBtnWidth } from '@/util/formatBtnWidth'
Vue.prototype.$formatBtnWidth = formatBtnWidth
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
