// import request from '../api/request'

function getSetting () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          global.alreadyGetSetting = true
          // 必须是在用户已经授权的情况下调用
          wx.getUserInfo({
            success: (res) => {
              console.log('1111', res)
              // request({
              //   method: 'post',
              //   url: '/daodao/account/updateUserInfo',
              //   data: {
              //     'iv': res.iv,
              //     'encryptedData': res.encryptedData
              //   }
              // })
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
