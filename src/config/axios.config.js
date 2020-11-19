import fetch from './Interceptor.config'
import DOMAIN from '@/utils/domain'
import { sinkey } from './shaparams'
import { objKeySort } from '@/utils/utils'
import Qs from 'qs'
import md5 from 'md5'
// import secret from './secret'

/**
 * 移除提交请求中 列为空 null undefined 的值
 * @param {Object} params  传递过来的参数
 * @param {Array} removeField  要移除的配置项
 */
function removeEmptyField(params = {}, removeField = []) {
  let copyParams = JSON.parse(JSON.stringify(params))
  let arrField = removeField
  if (removeField.length === 0) {
    arrField = Object.keys(params)
  }
  arrField.forEach(key => {
    let val = copyParams[key]
    if (val === '' || val === undefined || val === null) {
      delete copyParams[key]
    }
  })
  return copyParams
}
/**
 * 过滤传递过来的参数
 * @param {0bject} params 传递过来的参数
 * @param {0bject} config 配置表
 */
function filterParams(params, config) {
  if (config.isRemoveField) {
    return removeEmptyField(params, config.removeField)
  }
  return params
}
/**
 * 过滤url域名
 * @param {String} url
 */
function filterApi(url) {
  const regExp = /^(http[s]{0,1})/
  if (regExp.test(url)) {
    return url
  } else {
    return `${DOMAIN.domain}${url}`
  }
}
/**
 * GET请求
 * @param {String} url   请求路径
 * @param {0bject} params 传递过来的参数
 * @param {0bject} config 配置表
 */
export function get(url, params = {}, config = {}) {
  const api = filterApi(url)
  const opts = { ...config }
  params = filterParams(params, opts)
  const timedata = Date.parse(new Date())
  params.time = timedata
  params = objKeySort(params)
  let data = changeStr(sinkey) + '&' + Qs.stringify(params)
  data = decodeURIComponent(data)
  params.sign = md5(data).toUpperCase()
  params = objKeySort(params)
  params = Qs.stringify(params)
  return fetch({
    url: api,
    method: 'get',
    params,
    headers: opts,
  })
}
// export function get(url, params = {}, config = {}) {
//   const api = filterApi(url)
//   const opts = { ...config }
//   params = filterParams(params, opts)
//   return fetch({
//     url: api,
//     method: 'get',
//     params: params,
//     headers: opts,
//   })
// }
/**
 *
 * @param {*} url
 * @param {*} params
 * @param {*} config
 */
function changeStr(str) {
  return unescape(str.replace(/\\u/g, '%u'))
}
/**
 * POST请求 B级别加密
 * @param {String} url   请求路径
 * @param {0bject} params 传递过来的参数
 * @param {0bject} config 配置表
 */
export function post(url, params = {}, config = {}) {
  const api = filterApi(url)
  const opts = { ...config }
  params = filterParams(params, opts)
  const timedata = Date.parse(new Date())
  params.time = timedata
  params = objKeySort(params)
  let data = changeStr(sinkey) + '&' + Qs.stringify(params)
  data = decodeURIComponent(data)
  params.sign = md5(data).toUpperCase()
  params = objKeySort(params)
  params = Qs.stringify(params)
  return fetch.post(api, params, opts)
}
/**
 * POST请求
 * @param {String} url   请求路径
 * @param {0bject} params 传递过来的参数
 * @param {0bject} config 配置表
 */
export function deleteOption(url, params = {}, config = {}) {
  const api = filterApi(url)
  const opts = { ...config }
  params = filterParams(params, opts)
  return fetch({
    url: api,
    method: 'delete',
    params,
    headers: opts,
  })
}
/**
 * PUT请求
 * @param {String} url   请求路径
 * @param {0bject} params 传递过来的参数
 * @param {0bject} config 配置表
 */
export function put(url, params = {}, config = {}) {
  const api = filterApi(url)
  let opts = { ...config }
  const data = filterParams(params, opts)
  return fetch.put(api, data, opts)
}
