import { getType } from '@/utils/utils'
class Mapping {
  /**
   * 设置字段映射
   * @param {String} key
   * @param {Object} data  请求的数据
   * @param {Object} keys 需要映射的字段
   */
  set(key, mapData, data) {
    this.mapData = mapData
    this.data = data
    const type = getType(mapData)
    if (type === 'Object') {
      return this.setObject(key)
    } else if (type === 'Array') {
      return this.setArray()
    }
  }
  setObject() {
    const result = {}
    for (let key in this.mapData) {
      result[key] = this.data[key]
    }
    return result
  }
  setArray() {
    const result = []
    this.data.forEach(item1 => {
      const obj = item1
      this.mapData.forEach(item => {
        if (obj[item]) {
          obj[item] = item1['item']
        }
      })
      result.push(obj)
    })
    return result
  }
}
export default new Mapping()
