<template>
  <div class="toast-modal" v-show="toastText.length > 0">
    <div class="text">{{ toastText }}</div>
  </div>
</template>

<script>
/**
 *
 * @author <zhangsong@bayread.com>
 * @description 此组件提供toast弹窗效果
 */
let timeoutId = null
export default {
  data() {
    return {
      toastText: '', // toast文案 / 父组件获取子组件分发数据属性
    }
  },
  methods: {
    initialToast(time = 2500) {
      this.clearTimeoutHandler()
      this.setTimeoutHandler(time)
    },
    clear() {
      this.toastText = ''
      this.clearTimeoutHandler()
    },
    clearTimeoutHandler() {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    },
    setTimeoutHandler(time) {
      timeoutId = setTimeout(this.clear, time)
    },
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
div.toast-modal {
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 99999;
  display: flex;
  margin: auto;
  bottom: 0;
  width 100%
  top: 0;
  .text {
    background: rgba(8, 8, 8, 0.75);
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    min-width: 100px;
    max-width 80%
    box-sizing border-box
    font-size: 12px;
    padding: 5px 12px;
    display: flex;
    // height: 35px;
    color: #fff;
    line-height  1.5
    text-align center
  }
}
</style>
