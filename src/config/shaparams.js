/**
 * 加密组装
 */
import { Base64 } from 'js-base64'

const sinkey1 = 'XHUwMDM3XHUwMDYyXHUwMDM3XHUwMDY2XHUwMDcwXHUwMDZj'
const sinkey2 = 'XHUwMDY0XHUwMDM0XHUwMDcyXHUwMDZmXHUwMDY1XHUwMDc5'
const sinkey3 = 'XHUwMDMwXHUwMDY1XHUwMDM2XHUwMDY1'

export const publicKey = 'publicKey'
export const pkv = 'pkv'
export const sinkey =
  Base64.decode(sinkey1) + Base64.decode(sinkey2) + Base64.decode(sinkey3)
