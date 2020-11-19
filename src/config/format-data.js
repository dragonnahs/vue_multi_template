// import Cache from '@/config/cache'
import { post, put, deleteOption } from '@/config/axios.config'

/**
 * 统一获取数据
 * @param {String} api        请求url
 * @param {Object} params     请求参数
 * @param {Object} config     请求配置项
 */
export function postFormatData(api, params, config) {
  return post(api, params, config)
}
/**
 * 统一获取数据
 * @param {String} api        请求url
 * @param {Object} params     请求参数
 * @param {Object} config     请求配置项
 */
export function putFormatData(api, params, config) {
  return put(api, params, config)
}
/**
 * 统一获取数据
 * @param {String} api        请求url
 * @param {Object} params     请求参数
 * @param {Object} config     请求配置项
 */
export function deleteFormatData(api, params, config) {
  return deleteOption(api, params, config)
}
