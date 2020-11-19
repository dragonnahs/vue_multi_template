import { BROWSER, addClass } from '../utils'

export default function init() {
  const className = BROWSER.isiPhone ? 'ios' : 'android'
  const dpr = window.devicePixelRatio || 1
  const docEl = document.documentElement
  // 添加设备类型
  addClass(docEl, className)
  // 添加 data-dpr 属性用作字体适配
  docEl.setAttribute('data-dpr', dpr)
}
