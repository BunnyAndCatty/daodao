<template>
  <div class="container" ref="container">
    <div class="expenses">
      <div class="month_total">
        <div class="desc">本月花费(元)</div>
        <div class="total_money">70</div>
      </div>
      <div class="month_select">
        <span @click="select_time">11</span>
        <span>11</span>
      </div>
    </div>
    <div class="income"></div>
    <bottomMenu :options="options" v-show="show_bottomMenu"></bottomMenu>
  </div>
</template>

<script>
import bottomMenu from '../../components/common-bottom-menu/common-bottom-menu'

export default {
  data () {
    return {
      userInfo: {},
      options: ['年', '月'],
      show_bottomMenu: false
    }
  },

  components: {
    bottomMenu
  },

  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    select_time () {
      this.show_bottomMenu = true
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.container{
  padding: 10px;
  height: 100vh;
  overflow: scroll;
  .expenses{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .income{

  }
}
</style>


