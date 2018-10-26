
const checkSession = function () {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success () {
        // session_key 未过期
        return resolve()
      },
      fail () {
        // session_key 已过期重新登录
        return reject(
          new Error()
        )
      }
    })
  })
}
export default checkSession
