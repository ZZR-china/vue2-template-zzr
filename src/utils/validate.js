/* eslint-disable no-useless-escape */
const validateNum = (rule, value, callback) => {
  const reg = /^\d+$/
  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('请输入正整数'))
  }
}

const validateFloat = (rule, value, callback) => {
  const reg = /^\d+(\.\d+)?$/
  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('请输入大于等于零的数字'))
  }
}

const validatePhone = (rule, value, callback) => {
  const reg = /^1[3456789]\d{9}$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号！'))
  }
  callback()
}

const validatePhoneComm = (value) => {
  const reg = /^1[3456789]\d{9}$/
  if (!reg.test(value)) {
    // callback(new Error('请输入正确的手机号！'))
    return false
  }
  return true
}

const validateEmail = (rule, value, callback) => {
  const reg = /^[a-z0-9]+(._\\-)*@([a-z0-9]+[a-z0-9]+.){1,63}[a-z0-9]+$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确格式的邮箱！'))
  }
  callback()
}

const validateOtherCode = (rule, value, callback) => {
  const reg = /^[a-z0-9]+(._\\-)*@([a-z0-9]+[a-z0-9]+.){1,63}[a-z0-9]+$/
  if (!reg.test(value)) {
    callback(new Error('编码中不能含有乱码！'))
  }
  callback()
}

const validateUrl = (rule, value, callback) => {
  // let reg = /^((https|http|ftp|rtsp|mms)?://)/
  // let reg = "^((https|http|ftp|rtsp|mms)?://)"
  const strRegex = '^((https|http|ftp|rtsp|mms)?://)' +
          "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + // ftp的user@
          '(([0-9]{1,3}\.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
          '|' + // 允许IP和DOMAIN（域名）
          "([0-9a-z_!~*'()-]+\.)*" + // 域名- www.
          // eslint-disable-next-line no-useless-escape
          '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' + // 二级域名
          '[a-z]{2,6})' + // first level domain- .com or .museum
          '(:[0-9]{1,4})?' + // 端口- :80
          '((/?)|' + // a slash isn't required if there is no file name
          "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"

  const reg = new RegExp(strRegex)

  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('请输入正确的网址，如：http://www.xxx.com'))
  }
}

/**
   * @param {string} path
   * @returns {Boolean}
   */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default {
  validateNum,
  validateFloat,
  validatePhone,
  validatePhoneComm,
  validateEmail,
  validateOtherCode,
  validateUrl
}
