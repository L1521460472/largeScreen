/*
 * @Descripttion:
 * @version:
 * @Author: chentianyu
 * @Date: 2021-12-31 14:16:13
 * @LastEditors: chentianyu
 * @LastEditTime: 2022-01-04 11:38:06
 */
// import lazyLoading from './lazyLoading'
const loadView = require('./lazyLoading')
export default (routers, data) => {
  // 这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
  // 所以这里要做一些转换
  generaMenu(routers, data)
}
function generaMenu(routers, data) {
  alert(data)
  data.forEach((item) => {
    let menu = Object.assign({}, item)
    let path = item.path
    if (!path) {
      path = dealPath(item.menuNameNick)
    }
    menu = {
      path: path,
      component: loadView(item.menuNameNick),
      meta: { title: item.menuName, menuId: item.menuId }
    }
    if (item.childMenus && item.childMenus.length > 0) {
      if (item.isRoot) {
        menu.children = []
        generaMenu(menu.children, item.childMenus)
      } else {
        generaMenu(routers, item.childMenus)
      }
    }
    routers.push(menu)
  })
}
function dealPath(menuNameNick) {
  while (menuNameNick.indexOf('/') > -1) {
    menuNameNick = menuNameNick.replace('/', '_')
  }
  // menuNameNick = bus.replaceAll('/', '_');
  menuNameNick = '/' + menuNameNick
  return menuNameNick
}
// export const loadView = (name) => {
//   return (resolve) => require([`@/${name}`], resolve)
// };
