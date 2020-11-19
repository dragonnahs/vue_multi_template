
const platformId = Number(localStorage.getItem('platformId')) // 平台号

/**
 * 路径跳转
 * 站内 H5 跳转 H5 页面
 * 3平台是浏览器～不需要编码
 */

export function routerToNative(url) {
  if (platformId === 3) {
    window.location.assign(url)
  } else {
    window.location.assign(`breader://common/browser?url=${encodeURIComponent(url)}`)
  }
}
/**
 * 这个是去书籍的排行榜页面
 */

export function jumpBookRanking() {
  window.location.assign('breader://bookstore/ranking')
}

/**
 * 跳转书籍详情
 * @param {Object} json bookId 书籍的bookId
 */
export function jumpBookDetail(json = { bookId: '' }) {
  const { bookId } = json
  console.log(bookId)
  window.location.assign(`breader://bookstore/bookDetails?bookId=${bookId}`)
}

/**
 * 绑定微信
 */
export function bindingWechat() {
  window.location.assign('breader://binding/wechat')
}

/**
 * 复制粘贴板schme信息
 * @param {*} obj scheme中需要拼接到内容
 * @param {*} posType 1=注册用户时识别，2=启动app时识别
 */
export function copyToClipboardNative(obj, posType) {
  let scheme = 'breader://report/umeng'
  if (obj && typeof obj === 'object') {
    let keyValueArr = []
    Object.keys(obj).map(key => {
      keyValueArr.push(`${key}=${obj[key]}`)
    })
    scheme = keyValueArr.length > 0 ? (scheme + '?' + keyValueArr.join('&')) : scheme
  }
  let result = {
    scheme,
    posType: posType || 1,
    magicCode: 'lwby'
  }
  return JSON.stringify(result)
}

/**
 * 视频播放
 * @param {*} params
 * pageType 2为单个视频 0为视频feed 1为我的收藏 3为合集视频  videoType 2 为小说翻拍 3为自制剧集 4为搞笑视频）
 */
export function goVideoPage(params) {
  let { videoId = '', pageType = 2, videoType = 2 } = params
  console.log(params)
  window.location.assign(`breader://videofeed/detail/play?videoId=${videoId}&pageType=${pageType}&videoType=${videoType}`)
}