/**
 * 封装全局的toast弹窗
 */

import toast from './toast.vue'

export default {
  install(Vue) {
    let ToastConstructor = Vue.extend(toast)
    let toastInstance
    const initInstance = () => {
      toastInstance = new ToastConstructor()
      let toastEl = toastInstance.$mount().$el
      document.body.appendChild(toastEl)
    }
    Vue.prototype.$showToast = (text, time) => {
      if (!toastInstance) initInstance()
      if (typeof text === 'string') {
        toastInstance.toastText = text
      } else {
        throw new TypeError(`${text} not a string.`)
      }
      toastInstance.initialToast(time)
    }
    Vue.prototype.$clearToast = () => {
      toastInstance.clear()
    }
  },
}
