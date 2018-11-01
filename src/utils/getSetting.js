function getSetting () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          global.alreadyGetSetting = true
          // 必须是在用户已经授权的情况下调用
          wx.getUserInfo({
            success: (res) => {
              // console.log(res)
            }
          })
          resolve()
        } else {
          reject(
            new Error()
          )
        }
      }
    })
  })
}
export default getSetting
