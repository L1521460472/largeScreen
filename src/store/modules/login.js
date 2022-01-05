import Cookies from 'js-cookie'
import {
  fmUserLogin, fmUserChangeUserPwd, getTokenByCode, loginInfo, getSsoUrl, getClients, tokenLogin, publicKey,
  getUserInfo
} from '@/view/api/ajax'
import SideMenuUtils from '@/utils/sideMenuUtils'
import MenuUtils from '@/utils/menuUtils'
import { clientId } from '@/config'
/* ----------------------------------------*/
const sideMenus = []
const routers = []
const fmMenus = []
//
function loginData(data) {
  window.sessionStorage.setItem('menus-ss', JSON.stringify(data))
  MenuUtils(routers, data)
  window.sessionStorage.setItem('sideMenus-ss', JSON.stringify(sideMenus))
}
//
function filterAsyncRouter(routes) {
  const firstPage = {
    menuId: 1,
    parentId: -1,
    menuNameNick: 'page/Dashboard',
    menuName: 'Dashboard首页',
    hasChild: 'N',
    menuDepth: 2,
    childMenus: []
  }
  //
  const sysMenus = []
  sysMenus.push(firstPage)
  if (routes.menus && routes.menus.childMenus !== null) {
    routes.menus.childMenus.forEach(v => {
      sysMenus.push(v)
    })
  }
  //
  const menu = {
    path: '/',
    menuNameNick: 'layout/Home',
    menuName: '首页',
    hasChild: 'Y',
    isRoot: true
  }
  menu.childMenus = []
  for (let i = 0; i < sysMenus.length; i++) {
    if (sysMenus[i].menuDepth === 2) {
      menu.childMenus.push(sysMenus[i])
    }
  }
  SideMenuUtils(sideMenus, menu.childMenus)
  fmMenus.push(menu)
  loginData(fmMenus)
}
/* ----------------------------------------*/
const login = {
  namespaced: true,
  state: {
    addRouters: [],
    clients: [],
    checkedData: null,
    permission_routes: null,
    tokenByCodeResp: null,
    ssoUrlResp: null,
    clientResp: null,
    addMenuDataResp: null,
    tokenLoginResp: null,
    publicKeyResp: null,
    UserInfo: null // 获取用户信息
  },
  mutations: {
    FM_USER_LOGIN_REQUEST(state, data) {
      const routes = []
      MenuUtils(routes, fmMenus)
      state.addRouteroutesrs = routes
      //
      state.clients = data.clients
      state.permission_routes = sideMenus
      sessionStorage.setItem('clients', JSON.stringify(data.clients))
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    FM_USER_CHANGE_USER_PWD_REQUEST: (state, obj) => {
      state.checkedData = obj
    },
    GET_TOKEN_BY_CODE(state, data) {
      state.tokenByCodeResp = data
      const routes = []
      MenuUtils(routes, fmMenus)
      state.addRouters = routes
      console.log('routes', JSON.stringify(routes))
      state.permission_routes = sideMenus
      console.log('sideMenus', JSON.stringify(sideMenus))
    },
    ADD_MENU_DATA(state, data) {
      if (data.res.code === 200) {
        filterAsyncRouter(data.res.obj)
        state.permission_routes = sideMenus
        const routes = []
        MenuUtils(routes, fmMenus)
        data.data.router.addRoutes(routes)
      }
      state.addMenuDataResp = data.res
    },
    GET_SSO_URL(state, data) {
      state.ssoUrlResp = data
    },
    GET_CLIENTS(state, data) {
      state.clientResp = data
    },
    TOKEN_LOGIN(state, data) {
      state.tokenLoginResp = data.res
      const routes = []
      MenuUtils(routes, fmMenus)
      state.addRouters = routes
      state.permission_routes = sideMenus
      // data.data.router.addRoutes(routes);
    },
    GET_PUBLIC_KEY(state, data) {
      state.publicKeyResp = data
    },
    // 获取用户信息
    GET_USERINFO_BY_USERNO(state, data) {
      state.UserInfo = data
    }
  },
  actions: {
    // 登录请求
    async fmUserLoginRequest({ dispatch, commit }, data) {
      const res = await fmUserLogin(data)
      if (res.code === 200) {
        const { code, obj } = res
        const { refreshToken, token } = obj
        localStorage.setItem('token_' + clientId, token)
        localStorage.setItem('refresh', refreshToken)
        localStorage.setItem('ms_username', obj.user.userName)
        localStorage.setItem('ms_userNo', obj.user.userNo)
        sessionStorage.setItem('userInfo-pt', JSON.stringify(obj.user))
        filterAsyncRouter(obj)
        commit('FM_USER_LOGIN_REQUEST', obj)
        // dispatch('kdOrganization/findAll',{},{root:true});
        // dispatch('kdSortingPlan/findAll',{},{root:true});
      }
    },
    //
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    async fmUserChangeUserPwdRequest({ commit }, obj) {
      const resp = await fmUserChangeUserPwd(obj)
      commit('FM_USER_CHANGE_USER_PWD_REQUEST', resp)
    },
    async getTokenByCode({ commit }, data) {
      const res = await getTokenByCode(data)
      if (res.code === 200) {
        const { code, obj } = res
        const { refreshToken, token } = obj
        localStorage.setItem('token_' + clientId, token)
        localStorage.setItem('refresh', refreshToken)
        localStorage.setItem('ms_username', obj.user.userName)
        localStorage.setItem('ms_userNo', obj.user.userNo)
        localStorage.setItem('warehouseName', obj.warehouseName)
        localStorage.setItem('Datascreen', obj.user.roleName)
        sessionStorage.setItem('userInfo-pt', JSON.stringify(obj.user))
        filterAsyncRouter(obj)
      }
      commit('GET_TOKEN_BY_CODE', res)
    },
    async addMenuData({ commit }, data) {
      const res = await loginInfo(data)
      commit('ADD_MENU_DATA', { res, data })
    },
    async getSsoUrl({ commit }, data) {
      const res = await getSsoUrl(data)
      commit('GET_SSO_URL', res)
    },
    async getClients({ commit }, data) {
      const res = await getClients(data)
      commit('GET_CLIENTS', res)
    },
    async tokenLogin({ commit }, data) {
      const res = await tokenLogin(data)
      if (res.code === 200) {
        const { code, obj } = res
        localStorage.setItem('ms_username', obj.user.userName)
        localStorage.setItem('ms_userNo', obj.user.userNo)
        sessionStorage.setItem('userInfo-pt', JSON.stringify(obj.user))
        filterAsyncRouter(obj)
      }
      commit('TOKEN_LOGIN', { res, data })
    },
    async getPubicKey({ commit }, obj) {
      const resp = await publicKey(obj)
      commit('GET_PUBLIC_KEY', resp)
    },
    // //获取用户信息
    async getUserInfoByUserNo({ commit }, obj) {
      const resp = await getUserInfo(obj)
      commit('GET_USERINFO_BY_USERNO', resp)
    }
  }
}
export default login
