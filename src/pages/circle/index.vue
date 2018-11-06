<template>
  <div class="circle_container">
    <div v-if="!already_get_setting" class="not_get_setting">
      <div class="tips">请先登录哦</div>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">立即登录</button>
      <button open-type="openSetting">打开授权设置页</button>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script>
import getSetting from '../../utils/getSetting'
export default {
  components: {
  },

  data () {
    return {
      already_get_setting: false
    }
  },

  computed: {
  },

  methods: {
    onGotUserInfo: function (e) {
      if (e.mp.detail.rawData) {
        // 授权
        getSetting()
          .then(() => {
            this.already_get_setting = true
            // 拉取数据
          })
      }
    }
  },
  mounted () {
    console.log('mounted')
  },
  onShow () {
    wx.setNavigationBarTitle({
      title: '圈子'
    })
    getSetting()
      .then(() => {
        this.already_get_setting = true
      })
      .catch()
  }
}
</script>

<style lang="less" scoped>
.circle_container{
  .not_get_setting{
    .tips{
      font-size: 18px;
      text-align: center;
      margin-top: 45%;
      margin-bottom: 30px
    }
    button{
      background-color: rgba(254,81,63,1);
      width: 200px;
      height: 40px;
      border-radius: 50px;
      color: #ffffff;
      line-height: 40px;
      margin-top: 20px;
    }
  }
}
</style>
