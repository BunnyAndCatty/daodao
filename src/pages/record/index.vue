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
          <span @click="selectPay" :class="{activeType: activeType===0}">支出</span>
          <span @click="selectIncome" :class="{activeType: activeType===1}">收入</span>
        </div>
        <input class="number" v-model="number"></input>
      </div>
      <div class="tags">
        <swiper class="swiper" indicator-dots="true">
          <div class="swiper_item" v-for="(item, index) in icon_container_item_array" :key="index">
            <swiper-item>
              <div class="iconContainer">
                <div class="icon" v-for="(icon_item, icon_index) in item" @click="showTagDetail(index, icon_index)">
                  <div :class="['iconfont', 'icon_img', 'icon-'+icon_item.icon]"></div>
                  <div class="icon_desc">{{icon_item.desc}}</div>
                </div>
              </div>
            </swiper-item>
          </div>
        </swiper>
      </div>
      <div class="tagDetail" v-if="show_tag_detail" @click="closeTagDetail">
        <radio-group class="radio-group" @change="radioChange" color="yellow">
          <label class="radio_item" v-for="(item,index) in tag_detail" :key="index" @click="choseTag(item)">
            <span class="radio_left">
                <div :class="['iconfont', 'icon_img', 'icon-'+item.icon]"></div>
                <div class="icon_desc">{{item.desc}}</div>
            </span>
            <radio :value="item.desc" :checked="item.checked" class="radio_circle" color="rgb(255,204,0)"/>
          </label>
        </radio-group>
      </div>
      <numberKeyBoard @clickKeyboard="clickKeyboard"  v-if="!show_tag_detail"></numberKeyBoard>
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
      tags_array: [
        {
          icon: 'zuofan',
          desc: '餐饮',
          items: [
            {
              icon: 'mianbao',
              desc: '早餐'
            },
            {
              icon: 'jitui',
              desc: '午餐'
            },
            {
              icon: 'mifan',
              desc: '晚餐'
            }
          ]
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
      ],
      show_tag_detail: false,
      tag_detail: [] // 子标签，详情dialog
    }
  },

  computed: {
    icon_container_item_array: function () {
      let array = []
      for (let i = 0; i < this.tags_array.length; i = i + 8) {
        if (this.tags_array[i].items) {
          this.tags_array[i].items.unshift({
            'icon': this.tags_array[i].icon,
            'desc': this.tags_array[i].desc,
            'checked': true
          })
        }
        array.push(this.tags_array.slice(i, i + 8))
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
    selectPay () {
      this.activeType = 0
    },
    selectIncome () {
      this.activeType = 1
    },
    clickKeyboard (result) {
      console.log(result)
      if (result.length !== 0) {
        this.number = result.join('')
      } else {
        this.number = 0.00
      }
    },
    // tag详情
    showTagDetail (index, iconIndex) {
      let tagDetail = this.icon_container_item_array[index][iconIndex]
      if (tagDetail.items && tagDetail.items.length > 0) {
        this.show_tag_detail = true
        this.tag_detail = tagDetail.items
      }
    },
    radioChange (e) {
      // console.log(e.mp.detail.value)
    },
    closeTagDetail () {
      this.show_tag_detail = false
    },
    choseTag (item) {
      this.tag_detail.forEach(element => {
        element.checked = false
      })
      item.checked = true
      console.log(item)
    }
  },
  mounted () {
    // console.log('mounted')
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
    .swiper{
      height: 170px;
      padding: 10px 0;
      .swiper_item{
        width: 100%;
        .iconContainer{
          width: 100%;
          height: 140px;
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
              margin-top: 5px;
            }
          }
          
        }
      }
    }
  }
  .tagDetail{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(85, 85, 102, 0.5);
    .radio-group{
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #ffffff;
      opacity: 1;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      .radio_item{
        padding: 5px 15px;
        border-top: 1px solid rgba(85, 85, 102, 0.5);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .radio_left{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .icon_img{
            font-size: 30px;
          }
          .icon_desc{
            font-size: 12px;
            text-align: center;
            margin-left: 20px;
          }
        }
        .radio_circle{

        }
      }
      .radio_item:nth-child(1){
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
  }
}
</style>
