<template>
  <div>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="_onGotUserInfo">获取用户信息</button>
    <button open-type="openSetting">打开授权设置页</button>
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
    }
  },

  methods: {
    // 获取是否授权过
    getSetting () {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            // 必须是在用户已经授权的情况下调用
            wx.getUserInfo({
              success: (res) => {
                console.log(res)
              }
            })
            // 路由跳转
            wx.switchTab({
              url: '/pages/index/main'
            })
          }
        }
      })
    },
    // 调用登录接口检查session_key给后端code
    login () {
      wx.checkSession({
        success () {
          // session_key 未过期，并且在本生命周期一直有效
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          wx.login({
            success (res) {
              if (res.code) {
                console.log(res.code)
                // 发起网络请求
                // wx.request({
                //   url: '',
                //   data: {
                //     code: res.code
                //   },
                //   success (res) { // 获取token,后续请求需要携带
                //     console.log(res.data)
                //   }
                // })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
      })
    },
    _onGotUserInfo: function (e) {
      if (e.mp.detail.rawData) {
        // 授权按钮
        wx.switchTab({
          url: '/pages/index/main'
        })
      } else {
        // 拒绝按钮
      }
    }
  },

  created () {
    this.login()
  },

  mounted () {
    this.getSetting()
  }
}
</script>

<style>

</style>
