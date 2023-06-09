import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 引入datav
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)
// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 时间
import formatterDate from '@/util/timeData'
Vue.prototype.$formatterDate = formatterDate

// 严格模式
Vue.config.productionTip = false
// 事件中央总线
Vue.prototype.$bus = new Vue()
// 模态框拖拽
import '@/util/directives'
// 粒子背景
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
