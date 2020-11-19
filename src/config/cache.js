// TODO? 过期时间  次数、日期
class Cache {
  constructor() {
    this.data = {}
  }
  /**
   * 获取映射数据
   * @param {String} key
   */
  get(key) {
    if (typeof key !== 'string') {
      throw new Error('key必须是string类型')
    }
    return this.data[key]
  }
  /**
   * 设置字段映射
   * @param {String} key
   * @param {Object} data  请求的数据
   */
  set(key, data) {
    if (!key && !data) {
      throw new Error('key & data 字段是必填项')
    }
    if (typeof key !== 'string') {
      throw new Error('key必须是string类型')
    }
    this.data[key] = data
  }
}
export default new Cache()
