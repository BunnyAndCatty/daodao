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
      <div class="tags">
        <scroll-view scroll-x="true" class="scroll-view_H">
          <div class="scroll-view_H_item" v-for="(item, index) in icon_container_item_array">
            <div class="iconContainer">
              <div class="icon" v-for="(icon_item, icon_index) in item">
                <div :class="['iconfont', 'icon_img', 'icon-'+icon_item.icon]"></div>
                <div class="icon_desc">{{icon_item.desc}}</div>
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
      <numberKeyBoard @clickKeyboard="clickKeyboard"></numberKeyBoard>
    </div>
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
      number: '0.00',
      icon_array: [
        {
          icon: 'zuofan',
          desc: '餐饮'
        },
        {
          icon: 'gouwuche',
          desc: '购物'
        },
        {
          icon: 'caomei',
          desc: '水果'
        },
        {
          icon: 'yinliao',
          desc: '饮料'
        },
        {
          icon: 'gouwo',
          desc: '住宿'
        },
        {
          icon: 'zihangche',
          desc: '运动'
        },
        {
          icon: 'diandi',
          desc: '医疗'
        },
        {
          icon: 'shanshui',
          desc: '旅行'
        },
        {
          icon: 'shujia',
          desc: '学习'
        },
        {
          icon: 'shouji',
          desc: '通讯'
        },
        {
          icon: 'xiaoqiche',
          desc: '交通'
        },
        {
          icon: 'wenhao',
          desc: '其他'
        }
      ]
    }
  },

  computed: {
    icon_container_item_array: function () {
      let array = []
      for (let i = 0; i < this.icon_array.length; i = i + 8) {
        array.push(this.icon_array.slice(i, i + 8))
      }
      return array
    }
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
  .tags{
    .scroll-view_H{
      white-space: nowrap;
      .scroll-view_H_item{
        width: 100%;
        display: inline-block;
        .iconContainer{
          width: 100%;
          height: 130px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around; 
          .icon{
            width: 25%;
            text-align: center;
            .icon_img{
              font-size: 40px;
            }
            .icon_desc{
              font-size: 12px;
              text-align: center;
            }
          }
          
        }
      }
    }
  }
}
</style>
