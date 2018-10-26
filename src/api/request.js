import axios from './axios'
import checkSession from './checksession'
import login from './login'

/**
 *
 * @param {String} type [default: GET] 请求的类型
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {String} dataType 预期服务器返回的数据类型，xml html json ...
 * @param {Object} headers 自定义请求headers
 * @return {Promise}
 */

const ajax = function (configs) {
  try {
    var token = wx.getStorageSync('token')
    console.log(token)
    if (token) {
      let headers = Object.assign({}, {'Content-Type': 'application/jsoncharset=UTF-8', 'token': token}, configs.header)
      return axios({
        method: configs.method || 'GET',
        url: configs.url || '',
        headers: headers,
        dataType: configs.dataType || 'json',
        data: configs.data || {}
      })
        .then(res => {
          if (res.status === 200) {
            return res.data
          }
        })
        .catch(error => {
          if (error.code === 401) {
            return login()
              .then(() => {
                return ajax(configs)
              })
          }
          console.error(error)
        })
    }
  } catch (e) {
    // Do something when catch error
    console.error(e)
  }
}
// 调用登录接口检查session_key给后端code
function request (configs) {
  return checkSession(ajax, login)
    .then(() => {
      return ajax(configs)
    })
    .catch((e) => {
      return login()
        .then(() => {
          return ajax(configs)
        })
    })
}

export default request
