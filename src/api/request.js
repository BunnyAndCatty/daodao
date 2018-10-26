import axios from './axios'

/**
 *
 * @param {String} type [default: GET] 请求的类型
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {String} dataType 预期服务器返回的数据类型，xml html json ...
 * @param {Object} headers 自定义请求headers
 * @return {Promise}
 */
let token = ''

const ajax = function (configs) {
  return axios({
    method: configs.method || 'GET',
    url: configs.url || '',
    headers: configs.headers || {
      'Content-Type': 'application/jsoncharset=UTF-8'
    },
    dataType: configs.dataType || 'json',
    data: configs.data || {},
    token: token
  })
    .then(res => {
      if (res.status === 200) {
        return res.data
      } else if (res.status === 401) {
        // login
        login(configs)
      }
    })
    .catch(error => {
      console.error(error)
    })
}

const login = function (configs) {
  wx.login({
    success (res) {
      if (res.code) {
        wx.request({
          url: '/cashbook/account/login',
          data: {
            code: res.code
          },
          success (res) { // 获取的token,后续请求需要携带
            token = res.data
            ajax(configs)
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}
// 调用登录接口检查session_key给后端code
function request (configs) {
  wx.checkSession({
    success () {
      // session_key 未过期
      ajax(configs)
    },
    fail () {
      // session_key 已过期重新登录
      login(configs)
    }
  })
}

export default request
