<template>
  <div>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">获取用户信息</button>
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
                // console.log(res)
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
    onGotUserInfo: function (e) {
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
  },

  mounted () {
    this.getSetting()
  }
}
</script>

<style>

</style>
