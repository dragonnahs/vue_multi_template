const isProd = process.env.VUE_APP_DEVELOP_ENV === 'false'
const isDev = !isProd

export default {
  isProd,
  isDev,
}
