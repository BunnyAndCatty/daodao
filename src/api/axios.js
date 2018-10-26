const axios = function (config) {
  wx.showLoading({ title: '拼命加载中...' })
  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      url: 'https://api.zh-yu.com' + config.url,
      success: res => {
        if (res.statusCode < 200 || res.statusCode > 300) {
          return reject(res.data || {})
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
