import service from '../../utils/server'
import {clientId} from '@/config/index'

const prefix = process.env.VUE_APP_PREFIX
const vueRouter = process.env.VUE_APP_ROOT_MOEL
const outhProtocal = process.env.VUE_APP_OUTH_PROTOCOL
export const getPersonInfo = data => {
  return service({
    url: '/fmUser/login',
    method: 'post',
    data
  })
}

export const fmUserChangeUserPwd = data => {
  return service({
    url: 'oauth/editPwd',
    method: 'post',
    data
  })
}

// export const fmRoleUserData = data => {
//     return service({
//         url: '/fmRole/getRoleInfoByName',
//         method: 'post',
//         data
//     })
// };

export const fmRoleUserAddData = data => {
  return service({
    url: '/fmRole/addRole',
    method: 'post',
    data
  })
}

export const fmRoleUpdateData = data => {
  return service({
    url: '/fmRole/updateRole',
    method: 'post',
    data
  })
}

export const fmUserQueryList = data => {
  return service({
    url: '/fmUser/getUsersByNoOrName',
    method: 'post',
    data
  })
}

export const fmUserLogin = data => {
  return service({
    url: '/fmUser/login',
    method: 'post',
    data
  })
}
export const fmUserLoginOut = data => {
  return service({
    url: '/oauth/out',
    method: 'get',
    data
  })
}
export const queryPowerByMenuId = data => {
  return service({
    url: '/fmPageOp/queryPowerByMenuId',
    method: 'post',
    data
  })
}

export const getTokenByCode = data => {
  console.log(vueRouter)
  return service({
    url: '/oauth/code/' + data.code + '/' + clientId + '?from=' + outhProtocal + window.location.host + vueRouter + '/login',
    method: 'get'
  })
}

export const loginInfo = data => {
  return service({
    url: '/login/loginInfo/' + data.platForm,
    method: 'post'
  })
}
export const getSsoUrl = () => {
  return service({
    url: '/oauth/ssoUrl/' + clientId + '?from=' + outhProtocal + window.location.host + vueRouter + '/login',
    method: 'get'
  })
}
export const getClients = () => {
  return new Promise(resolve => {
    resolve({code: 200, obj: []})
  })
  // return service({
  //   url: '/fm/fmUser/clients',
  //   method: 'get'
  // })
}

export const tokenLogin = data => {
  return service({
    url: '/oauth/loginInfo',
    method: 'get'
  })
}

export const publicKey = data => {
  return service({
    url: '/oauth/publicKey/' + data.userNo,
    method: 'get'
  })
}

//根据用户账号，查询用户信息
export const getUserInfo = data => {
  return service({
    url: prefix + '/dataCtr/userInfo/getUserInfo',
    method: 'post',
    data
  })
}

export const getWeatherInfo = data => {
  return service({
    url: clientId + '/common/common/getWeatherInfo',
    method: 'get',
    params: data
  })
}

export const getChangeToken = data => {
  return service({
    url: process.env.VUE_APP_OUTH_URL + '/oauth/changeClientId/console',
    method: 'get'
  })
}