import axios from 'axios'
import { Base64 } from 'js-base64'
import Qs from 'qs'
import { getCookie } from '@/utils/utils'
axios.defaults.retry = 3 // 设置默认重发送次数
axios.defaults.retryDelay = 1000 // 设置重发送间隔时间
axios.defaults.timeout = 5000 // 设置请求超时时间
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status < 300
}

export function setHeader() {
  let xClient = getCookie('xclient')
  if (xClient !== null && typeof xClient !== 'undefined' && xClient !== '') {
    var xstr = Base64.decode(xClient)
    let str = xstr.replace(/[;\s]+/mg, '&')
    let obj = Qs.parse(str)
    let coupVersion = obj.version.split('.')
    localStorage.setItem('platformId', coupVersion[0])
    window.localStorage.setItem('version', `${coupVersion[1]}.${coupVersion[2]}.${coupVersion[3]}`)
    window.localStorage.setItem('appVersion', coupVersion[1]*100 + coupVersion[2]*1)
    if (obj.webVersion != null &&  obj.webVersion == 'new' && typeof obj.webVersion != 'undefined') {
      window.localStorage.setItem('webVersion', obj.webVersion)
    }
    if (coupVersion != null && typeof coupVersion != 'undefined' && coupVersion != '') {
      window.localStorage.setItem('channelId', coupVersion[4])
    }
    return xstr
  }
}
/**
 * @description 请求拦截器
 */
axios.interceptors.request.use(
  async config => {
    config.headers.common['Cache-Control'] = 'no-cache'
    config.headers['Accept'] =
      'application/json, text/plain, */*; charset=utf-8'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers.common['Pragma'] = 'no-cache'
    config.headers.common['X-client'] = setHeader() || 'version=6.1.48.0.502000;dID=;signVersion=2;pkv=1;model=SM-G900P;manufacturer=Samsung'
    return config
  },
  error => {
    Promise.reject(error)
  }
)
axios.interceptors.response.use(
  function(response) {
    return response && response['data']
  },
  function(error = {}) {
    let response = error.response
    console.log(error)
    if (response === undefined) {
      console.error('网络异常, 请稍后重试')
    }
    return Promise.reject(error)
  }
)
export default axios
