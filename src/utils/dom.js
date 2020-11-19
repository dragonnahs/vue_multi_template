/**
 * 判断是否有某个className
 * @param {HTMLElement} element 元素
 * @param {string} className className
 * @return {boolean}
 */
export function hasClass(element, className) {
  let classNames = element.className
  if (!classNames) {
    return false
  }
  classNames = classNames.split(/\s+/)
  for (let i = 0, len = classNames.length; i < len; i++) {
    if (classNames[i] === className) {
      return true
    }
  }
  return false
}

/**
 * 添加className
 *
 * @param {HTMLElement} element 元素
 * @param {string} className className
 */
export function addClass(element, className) {
  if (!hasClass(element, className)) {
    element.className = element.className ? [element.className, className].join(' ') : className
  }
}

/**
 * 删除元素className
 *
 * @param {HTMLElement} element 元素
 * @param {string} className className
 */
export function removeClass(element, className) {
  if (className && hasClass(element, className)) {
    let classNames = element.className.split(/\s+/)
    for (let i = 0, len = classNames.length; i < len; i++) {
      if (classNames[i] === className) {
        classNames.splice(i, 1)
        break
      }
    }
    element.className = classNames.join(' ')
  }
}

/**
 * get/set scrollTop 值
 * @export
 * @param {any} dom Node 节点
 * @param {any} value 需要设置的 scrollTop 值
 */
export function scrollTop(dom, value) {
  if (!dom) return 0
  const hasScrollTop = 'scrollTop' in dom
  if (value === undefined) {
    return hasScrollTop ? dom.scrollTop : dom.pageYOffset
  } else {
    hasScrollTop ? (dom.scrollTop = value) : dom.scrollTo(dom.scrollX, value)
    return 0
  }
}
