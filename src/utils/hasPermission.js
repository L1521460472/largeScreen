//
import store from '../store'
export function hasPermission(permission) {
  let isExist = false
  const mybtns = store.getters.mybtns

  if (mybtns === null || mybtns === undefined) {
    isExist = false
    return isExist
  }

  if (mybtns.indexOf(permission) > -1) {
    isExist = false
    return isExist
  } else {
    // console.log('找到了')
    isExist = true
    return isExist
  }

  return false
}
