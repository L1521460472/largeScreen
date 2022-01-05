import Vue from 'vue'
import Router from 'vue-router'
import auth from './auth'
import error from './error'
import store from '../store'
import luyou from './luyou'
import MenuUtils from '@/utils/menuUtils'
import Layout from './../layout/Home'
import LayoutScreen from './../layout/Home/ScreenMain'
import { clientId } from '@/config'
Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/view/Login/Login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/page/404'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/page/403'),
    hidden: true
  },
  {
    path: '/Datascreen',
    component: LayoutScreen,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/page/Datascreen'),
        name: 'DatascreenMain'
      },
      {
        path: '/Datascreen/carTrajectory',
        component: () => import('@/page/dataCenter/vehicleMonitoringCenter/carTrajectory.vue'),
        name: 'screenCarTrajectory'
      },
      {
        path: '/Datascreen/vehicleTrack',
        component: () => import('@/page/dataCenter/vehicleMonitoringCenter/vehicleTrack.vue'),
        name: 'screenVehicleTrack'
      }
    ]
  },
  {
    path: '/',
    // component: () => import('@/page/tempJump/tempJump'),
    redirect: '/page_Dashboard'
    // hidden: true
  },
  {
    path: '/page_Dashboard',
    component: Layout,
    // redirect: '/page_Dashboard',
    children: [
      {
        path: '',
        component: () => import('@/page/Dashboard'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

function getAbsolutePath() {
  const path = location.pathname
  return path.substring(0, path.lastIndexOf('/') + 1)
}

const router = new Router({
  mode: 'history', // require service support
  base: process.env.VUE_APP_ROOT_MOEL, // wds
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(luyou)
})
//

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
// ---------------------------------------------------------------------------------
// 使用钩子函数对路由进行权限跳转
router.beforeEach(async(to, from, next) => {
  const data = JSON.parse(window.sessionStorage.getItem('menus-ss'))
  const token = window.localStorage.getItem('token_' + clientId)
  const Datascreen = window.localStorage.getItem('Datascreen')
  if (token) {
    if (!store.state.tagsView.sidebar.opened) {
      store.dispatch('tagsView/toggleSideBar')
    }
    // if (Datascreen === 'Datascreen') {
    //   next({ path: '/Datascreen' })
    // }
    console.log(to.path)
    if (to.path === '/page_messageManager_messageDetail_messageDetail') {
      store.state.tagsView.message = 0
    }
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (data) {
        const routesArr = []
        next()
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      console.log(to.path)
      next()
    }
  }
})

export default router
