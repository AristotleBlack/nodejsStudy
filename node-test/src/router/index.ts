import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import NotFound from '../views/404.vue'
import routerFn from '../router/config'
import store from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/mainBox',
    name: 'mainBox',
    component: MainBox
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//拦截器
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!localStorage.getItem('token')) {
      next({ path: '/' })
    } else {
      if (!store.state.isToken) {
        router.removeRoute('mainBox')
        routerConfig()
        next({ path: to.fullPath })
      } else {
        next()
      }
    }
  }
})
const routerConfig = () => {
  if (!router.hasRoute('mainBox')) {
    router.addRoute({
      path: '/mainBox',
      name: 'mainBox', 
      component: MainBox
    })
  }
  routerFn.forEach(item => {
    isLimitFn(item) && router.addRoute('mainBox', item)
  })
  store.commit('getChangeToken', true)
}
const isLimitFn = (item: any) => {
  if (item.isLimit) {
    return store.state.personalDetails.role === 1
  }
  return true
}
export default router
