import axios from 'axios'
import { message } from '../utils/messageUtils.js'
const baseURL = process.env.VUE_APP_BASE_URL;
import { Loading } from 'element-ui'
import {clientId} from '@/config'

let loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
const endLoading = () => {
  setTimeout(() => {
    loading.close()
  }, 100)
}
const service = axios.create({
  baseURL: baseURL,
  timeout: 30000 // 请求超时时间
})
// axios.defaults.withCredentials=true;

/** **** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
  //
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json'
  }
  if (config.url != '/fmUser/login') {
    const token1 = localStorage.getItem('token_' + clientId)
    config.headers.Authorization = token1
  } else {
    config.headers.Authorization = null
  }

  if (config.data instanceof FormData) {
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      // 上传文件
    } else {
      const convertedBody = mapValues(config.data, value => {
        if (value instanceof Date) {
          return moment(value).format('YYYY-MM-DD HH:mm:ss')
        } else {
          return value
        }
      })

      config.data = convertedBody
    }
  } else if (Object.prototype.toString.call(config.data) === '[object Object]') {
    var bodyJson = {}
    for (var b in config.data) {
      var value = config.data[b]
      if (value instanceof Date) {
        bodyJson[b] = format(value, 'yyyy-MM-dd HH:mm:ss')
      } else {
        bodyJson[b] = value
      }
    }
    // debugger

    config.data = bodyJson
  }
  if (config.closeGlobalLoading && config.closeGlobalLoading.closeLoading) {
  } else {
    startLoading()
  }
  if (window.localStorage.getItem('UserInfo')) {
    config.headers.userInfo = window.localStorage.getItem('UserInfo')
  }
  return config
}, error => { // 请求错误处理
  //
  message.error(response.data.msg)
  Promise.reject(error)
})

/** **** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => { // 成功请求到数据
    // let loadingInstance = Loading.service({ fullscreen: true ,background:'rgba(0, 0, 0, 0.4)' ,text:"加载中..."});
    if (response.data.code === 200 || response.data.code == 201) {
      // loadingInstance.close();
      endLoading()
    } else if (response.data.code === 401 || response.data.code === 4031) {
      return refreshToken({ 'userNo': localStorage.getItem('ms_userNo'), platForm: 'Web', refreshToken: localStorage.getItem('refresh') }).then((res) => {
        if (res.code === 200) {
          // loadingInstance.close();
          endLoading()
          localStorage.setItem('token_' + clientId, res.obj)
          const config = response.config
          config.isRetryRequest = true
          config.headers.Authorization = res.obj
          return service(config)
        } else {
          // loadingInstance.close();
          endLoading()
          message.error('登录已失效，即将跳转登录界面')
          setTimeout(function () {
            toLogin()
          }, 2000)
        }
      }).catch(e => {
        // loadingInstance.close();
        endLoading()
        message.error('登录已失效，即将跳转登录界面')
        setTimeout(function () {
          toLogin()
        }, 2000)
      })
    } else if (response.data.code === 431 || response.data.code === 430) {
      // loadingInstance.close();
      endLoading()
      message.error(response.data.msg)
      setTimeout(function () {
        toLogin()
      }, 2000)
    } else {
      // loadingInstance.close();
      endLoading()
      if (response.data.msg) {
        message.error(response.data.msg)
      }
    }
    return response.data
  },
  error => { // 响应错误处理
    //
    if (error.response === undefined) {
      endLoading()
      message.error('网络超时，请稍后再试')
      const resp = {}
      resp.code = 500
      return resp
    }
    if (error.response.status === 401) { // 登录失效重新登录
      return refreshToken({ 'userNo': localStorage.getItem('ms_userNo'), platForm: 'Web', refreshToken: localStorage.getItem('refresh') }).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('token_' + clientId, res.obj)
          const config = error.config
          config.isRetryRequest = true
          config.headers.Authorization = res.obj
          return service(config)
        } else {
          setTimeout(function () {
            toLogin()
          }, 2000)
        }
      }).catch(e => {
        setTimeout(function () {
          toLogin()
        }, 2000)
      })
    } else if (error.response.status === 430 || error.response.status === 431) {
      setTimeout(function () {
        toLogin()
      }, 2000)
    } else {
      message.error('网络超时，请稍后再试')
      const resp = {}
      resp.code = error.response.status
      return resp
    }
  }
)
const toLogin = function () {
  endLoading()
  localStorage.clear()
  sessionStorage.clear()
  if(location.search) {
    location.href = location.pathname
  } else {
    location.reload()
  }
}
const refreshService = axios.create({
  baseURL: baseURL,
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})
const refreshToken = params => {
  endLoading()
  return refreshService.post('/oauth/refresh', params).then(res => res.data)
}
const format = (date, fmt) => {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
        : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
export default service
