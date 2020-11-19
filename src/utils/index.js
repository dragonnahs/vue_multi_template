import {
  getQueryString,
  getAppVersion,
  getQueryObject,
  getUrlParamsByObject,
} from '@/utils/url'
import { compareVersion } from '@/utils/string'
import { routerToNative } from '@/utils/native'
import {
  throttle,
  formatIsoTime,
  getType,
  isIPhoneXCallback,
  requestAnimFrame,
  getCookie
} from '@/utils/utils'
import BROWSER from '@/utils/browser'
import { addClass } from './dom'

export {
  getUrlParamsByObject,
  isIPhoneXCallback,
  getQueryString,
  getQueryObject,
  getAppVersion,
  compareVersion,
  BROWSER,
  formatIsoTime,
  getType,
  throttle,
  requestAnimFrame,
  getCookie,
  routerToNative,
  addClass
}
