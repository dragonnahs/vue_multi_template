import fastClickInit from './fastClick'
import htmlClassInit from './htmlClass'
import axiosInit from './axiosConfig'

const isProd = process.env.NODE_ENV === 'production'

fastClickInit(isProd)
htmlClassInit(isProd)
axiosInit(isProd)
