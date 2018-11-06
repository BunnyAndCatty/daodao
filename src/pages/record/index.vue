<template>
  <div class="circle_container">
    <div v-if="!already_get_setting" class="not_get_setting">
      <div class="tips">请先登录哦</div>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">立即登录</button>
      <button open-type="openSetting">打开授权设置页</button>
    </div>
    <div v-else>
      <div class="header">
        <div class="type">
          <span @click="select_pay" :class="{activeType: activeType===0}">支出</span>
          <span @click="select_income" :class="{activeType: activeType===1}">收入</span>
        </div>
        <input class="number" v-model="number"></input>
      </div>  
    </div>
    <numberKeyBoard @clickKeyboard="clickKeyboard"></numberKeyBoard>
  </div>
</template>

<script>
import getSetting from '../../utils/getSetting'
import numberKeyBoard from '../../components/numberKeyboard'
export default {
  components: {
    numberKeyBoard
  },

  data () {
    return {
      already_get_setting: '',
      activeType: 0,
      number: '0.00'
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
    },
    select_pay () {
      this.activeType = 0
    },
    select_income () {
      this.activeType = 1
    },
    clickKeyboard (result) {
      console.log(result)
      if (result.length !== 0) {
        this.number = result.join('')
      } else {
        this.number = 0.00
      }
    }
  },
  mounted () {
    console.log('mounted')
  },
  onShow () {
    wx.setNavigationBarTitle({
      title: '记账'
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
  .header{
    background-color: rgb(255,204,0);
    padding: 10px 0;
    .type{
      margin: 0 auto 30px;
      text-align: center;
      border: 1px solid gray;
      border-radius: 30px;
      height: 30px;
      width: 100px;
      span:nth-child(1){
        border-right: 1px solid gray;
        border-radius: 30px 0 0 30px;
      }
      span:nth-child(2){
        border-radius: 0 30px 30px 0;
      }
      span{
        width: 50%;
        box-sizing: border-box;
        padding: 5px 10px 6px 10px;
        font-size: 15px;
        height: 30px;
        line-height: 30px;
      }
      .activeType{
        color: rgb(255,204,0);
        background-color: black;
      }
    }
    .number{
      margin: 0 5px;
      font-size: 20px;
      text-align: center;
      border-bottom: 1px solid black;
    }
  }
}
</style>
