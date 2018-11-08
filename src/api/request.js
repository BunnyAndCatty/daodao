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
    if (token) {
      let header = Object.assign({}, {'token': token}, configs.header)
      return axios({
        method: configs.method || 'GET',
        url: configs.url || '',
        header: header,
        dataType: configs.dataType || 'json',
        data: configs.data || {}
      })
        .then(res => {
          if (res.statusCode === 200) {
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
    } else {
      return login()
        .then(() => {
          return ajax(configs)
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
