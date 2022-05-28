/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  var pattern = /[A-Za-z0-9_\-\u4e00-\u9fa5]+/
  // const valid_map = ['admin', 'editor', 'Jisoo']
  return pattern.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validPassword(str) {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
  return pattern.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUrl(str) {
  const pattern = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
  return pattern.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validEmail(str) {
  const pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  return pattern.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validMobilePhoneNum(str) {
  const pattern = /0?(13|14|15|18)[0-9]{9}/
  return pattern.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validTelephoneNum(str) {
  const pattern = /[0-9-()（）]{7,18}/
  return pattern.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validNegativeFloatingPointNum(str) {
  const pattern = /-([1-9]\d*.\d*|0.\d*[1-9]\d*)/
  return pattern.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validFloatingPointNum(str) {
  const pattern = /[1-9]\d*.\d*|0.\d*[1-9]\d*/
  return pattern.test(str)
}

/**
 * 检验是否为正整数
 * @param {string} str
 * @returns {Boolean}
 */
export function validInteger(str) {
  const pattern = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/
  return pattern.test(str)
}

/**
 * 检验是否为QQ号
 * @param {string} str
 * @returns {Boolean}
 */
export function validTencentNum(str) {
  const pattern = /[1-9]([0-9]{5,11})/
  return pattern.test(str)
}

/**
 * 检验是否为邮政编码
 * @param {string} str
 * @returns {Boolean}
 */
export function validZipCode(str) {
  const pattern = /\d{6}/
  return pattern.test(str)
}

/**
 * 检验是否为中文字符
 * @param {string} str
 * @returns {Boolean}
 */
export function validChinese(str) {
  const pattern = /^[\u4e00-\u9fa5]+$/
  return pattern.test(str)
}

/**
 * 检验是否为英文字符
 * @param {string} str
 * @returns {Boolean}
 */
export function validEnglish(str) {
  const pattern = /^[A-Za-z]+$/
  return pattern.test(str)
}

/**
 * 检验是否为身份证号
 * @param {string} str
 * @returns {Boolean}
 */
export function validIdCard(str) {
  const pattern = /\d{17}[\d|x]|\d{15}/
  return pattern.test(str)
}

/**
 * 检验是否为正整数
 * @param {string} str
 * @returns {Boolean}
 */
export function validPositiveInteger(str) {
  const pattern = /^[1-9]\d*$/
  return pattern.test(str)
}

/**
 * 检验是否为负整数
 * @param {string} str
 * @returns {Boolean}
 */
export function validNegativeInteger(str) {
  const pattern = /^-[1-9]\d*$/
  return pattern.test(str)
}
