import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
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
  next()
})

export default router
