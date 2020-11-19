// require('es6-promise').polyfill()
import axios from 'axios' // eslint-disable-line 
import { getQueryObject } from '../utils/url' // eslint-disable-line

const { channel, platform } = getQueryObject()

function getAppVersion() {
  try {
    const match = window.location.search.match(/appVersion=([^&]+)/)
    return match ? match[1] : ''
  } catch (ex) {
    return ''
  }
}

export default function init() {
  axios.defaults.timeout = 5000
  axios.defaults.validateStatus = function(status) {
    return status >= 200 && status < 300
  }
  // axios.defaults.proxy = {} // 之后做 mock 服务器代理
  axios.defaults.headers.common.eventTime = Date.now()
  axios.defaults.headers.common['client-version'] = getAppVersion()
  axios.defaults.headers.common['client-channel'] = channel
  axios.defaults.headers.common['client-type'] = platform
}
