/**
 * 数据加密处理
 */

const NodeRSA = require('node-rsa')
import CryptoJS from 'crypto-js'

/**
 *
 * @param {*} word
 * @param {*} key
 */
function Encrypt(word, key) {
  var passwordMd5 = CryptoJS.enc.Utf8.parse(key)
  var iv = CryptoJS.enc.Utf8.parse('16-Bytes--String')
  var encrypted = CryptoJS.AES.encrypt(word, passwordMd5, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}

/**
 *
 * @param {*} word
 * @param {*} key
 */
function Decrypt(word, key) {
  var passwordMd5 = CryptoJS.enc.Utf8.parse(key)
  var iv = CryptoJS.enc.Utf8.parse('16-Bytes--String')
  var decrypt = CryptoJS.AES.decrypt(word, passwordMd5, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

/**
 * 导入公钥
 * @param {*} word
 * @param {*} key
 */
function publicEncrypt(data, key) {
  var pubKey = new NodeRSA(key, 'pkcs8-public')
  const encrypted = pubKey.encrypt(data, 'base64')
  return encrypted
}

/**
 * 导入公钥
 * @param {*} word
 * @param {*} key
 */
function publicDecrypt(date, key) {
  var pubKey = new NodeRSA(key, 'pkcs8-public')
  const decrypted = pubKey.decryptPublic(date, 'utf-8')
  return decrypted
}

export default {
  Decrypt,
  Encrypt,
  publicEncrypt,
  publicDecrypt,
}
