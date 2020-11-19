import BROWSER, { isIphoneX } from '@/utils/browser'
export default {
  methods: {
    iosNavClass(rawSuffix = '') {
      let suffix = ''
      if (rawSuffix) suffix = `-${rawSuffix}`
      return {
        [`ios${suffix}`]: BROWSER.isiOS && !isIphoneX(),
        [`iphoneX${suffix}`]: isIphoneX() && BROWSER.isiOS,
      }
    },
  },
}
