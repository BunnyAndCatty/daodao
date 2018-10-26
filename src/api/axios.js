const axios = function (config) {
  wx.showLoading({ title: '拼命加载中...' })
  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      url: 'https://api.zh-yu.com' + config.url,
      success: res => {
        if (res.code < 200 || res.code > 300) {
          return reject(res || {})
        }
        return resolve(res.data || {})
      },
      complete: res => {
        wx.hideLoading()
        // TODO:
      }
    })
  })
}

export default axios
