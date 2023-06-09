import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入进度条动画
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)

var routes = [
  {
    path: '/SignIn',
    component: () => import('@/views/Login/SignIn.vue'),
  },
  {
    path: '/Home',
    component: () => import('../views/Home.vue'),
  },
]
const router = new VueRouter({
  routes,
  mode: 'hash',
})

router.beforeEach((to, from, next) => {
  NProgress.inc(0.2)
  NProgress.configure({
    easing: 'ease',
    speed: 700,
    showSpinner: false,
  })
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
