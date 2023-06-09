import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// 导入进度条动画
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

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
  if (to.path == '/SignIn') {
    //去登录页
    if (store.state.sys_user) {
      //是否已登录
      Vue.prototype.$message.success('您已登录')
      NProgress.done()
      next(false)
      return false
    } else {
      next()
    }
  } else {
    //去非登录页
    if (store.state.sys_user) {
      next()
    } else {
      next({
        path: '/SignIn',
      })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
