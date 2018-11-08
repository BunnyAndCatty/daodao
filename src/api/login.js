import axios from './axios'
const login = function () {
  return new Promise((resolve, reject) => {
    wx.login({
      success (res) {
        console.log(res)
        if (res.code) {
          axios({
            url: '/daodao/account/login',
            data: {
              code: res.code
            }
          })
            .then(res => {
              // 获取的token,后续请求需要携带
              console.log(res)
              wx.setStorageSync('token', res.token)
              resolve()
            })
        } else {
          reject(res.errMsg)
          // console.log('登录失败！' + res.errMsg)
        }
      }
    })
  })
}
export default login
