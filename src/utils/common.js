import { getUserInfo } from "../view/api/ajax";

/**
 * 判断是否为空
 * @param text
 * @returns true:空
 */
export function isEmpty (obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}

/**
 * 判断是否为空
 * @param text
 * @returns true:空
 */
export function getUserType (obj) {
  return window.localStorage.getItem('UserInfo')
}




