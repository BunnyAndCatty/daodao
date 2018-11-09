<template>
  <div class="circle_container">
    <div v-if="!already_get_setting" class="not_get_setting">
      <div class="tips">请先登录哦</div>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">立即登录</button>
      <button open-type="openSetting">打开授权设置页</button>
    </div>
    <div v-else class="already_get_setting">
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
      <div class="selectArea">
        <picker class="slectItem" mode="multiSelector" @change="calenderPickerChange" :range="calenderPickerArray">
          <span class="iconfont icon_img icon-rili"></span>
          <span class="date">{{calenderPickerValue}}</span>          
        </picker>
        <div class="slectItem" @click="showDatePick">
          <span class="iconfont icon_img icon-youyongquan"></span>
          <span class="date">{{calenderPickerValue}}</span>          
        </div>
      </div>
      <numberKeyBoard @clickKeyboard="clickKeyboard"></numberKeyBoard>
    </div>
    <div class="tagDetail" v-if="show_tag_detail" @click="closeTagDetail">
      <radio-group class="radio-group" @change="radioChange" color="yellow">
        <label class="radio_item" v-for="(item,index) in tag_detail" :key="index" @click="choseTag(item)">
          <span class="radio_left">
              <div :class="['iconfont', 'icon_img', 'icon-'+item.icon]"></div>
              <div class="icon_desc">{{item.desc}}</div>
          </span>
          <radio :value="item.desc" :checked="item.checked" color="rgb(255,204,0)"/>
        </label>
      </radio-group>
    </div>
    <div v-if="show_date_pick" class="circleDetail">
      <div class="selectContainer">
        <div class="item">
          <div class="left">
            <!-- <span class="avatar">
              <img src="../../../static/images/avatar.png"></img>
            </span> -->
            <avatar></avatar>
            <span class="circleName">123</span>
          </div>
          <div class="radio"></div>
        </div>
        <div class="item">
          <div class="left">
            <span class="avatar"></span>
            <span class="circleName">123</span>
          </div>
          <div class="radio"></div>
        </div>
        <div class="item">
          <div class="left">
            <span class="avatar"></span>
            <span class="circleName">123</span>
          </div>
          <div class="radio"></div>
        </div>
        <div class="item">
          <div class="left">
            <span class="avatar"></span>
            <span class="circleName">123</span>
          </div>
          <div class="radio"></div>
        </div>
        <div class="item">
          <div class="left">
            <span class="avatar"></span>
            <span class="circleName">123</span>
          </div>
          <div class="radio"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getSetting from '../../utils/getSetting'
import numberKeyBoard from '../../components/numberKeyboard'
import api from '../../api/record'
import avatar from '../../components/avatar'
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
var days = []
for (let i = 1; i < 32; i++) {
  if (i < 11) {
    days.push('0' + i)
  } else {
    days.push(i)
  }
}
export default {
  components: {
    numberKeyBoard,
    avatar
  },

  data () {
    return {
      already_get_setting: false,
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
      tag_detail: [], // 子标签，详情dialog
      calenderPickerArray: [['2015', '2016', '2017', '2018', '2019'], months, days],
      show_date_pick: false,
      calenderPickerValue: '2018-09-10',
      circlePickerValue: ['头像', '圈子名']
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
            api.getTags()
              .then((res) => {
                // console.log(res)
              })
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
    },
    calenderPickerChange (e) {
      this.calenderPickerValue = this.calenderPickerArray[0][e.mp.detail.value[0]] + '-' + this.calenderPickerArray[1][e.mp.detail.value[1]] + '-' + this.calenderPickerArray[2][e.mp.detail.value[2]]
    },
    showDatePick () {
      this.show_date_pick = true
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
        api.getTags()
          .then((res) => {
            // console.log(res)
          })
      })
      .catch()
  }
}
</script>

<style lang="less" scoped>
.circle_container{
  height: 100vh;
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
  .already_get_setting {
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
        display: flex;
        justify-content: center;
        align-items: center;
        span:nth-child(1){
          border-right: 1px solid gray;
          border-radius: 30px 0 0 30px;
        }
        span:nth-child(2){
          border-radius: 0 30px 30px 0;
        }
        span{
          width: calc(50% + 1px);
          box-sizing: border-box;
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
    .selectArea{
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      height: 50px;
      .slectItem{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180px;
        height: 100%;
        span{
          font-size: 16px;
        }
        .date{
          margin-left: 5px;
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
    z-index: 999;
    .radio-group{
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #ffffff;
      opacity: 1;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      max-height: 180px;
      overflow: scroll;
      .radio_item{
        padding: 10px 15px;
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
      }
      .radio_item:nth-child(1){
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
  }
  .circleDetail{
    width: 100%;
    height: 100%;
    background-color: rgba(85, 85, 102, 0.5);
    z-index: 999;
    position: absolute;
    left: 0;
    top: 0;
    .selectContainer{
      position: fixed;
      left: 0;
      bottom: 0;
      min-height: 60px;
      max-height: 180px;
      overflow-y: scroll;
      width: 100%;
      background-color: #ffffff;
      .item{
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-top: 1px solid rgba(85, 85, 102, 0.5);
        .left{
          height: 60px;
          line-height: 60px;
          display: flex;
          align-items: center;
          .avatar{
            display: inline-block;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            overflow: hidden;
            img{
              height: 100%;
              width: 100%;
            }
          }
          .circleName{
            margin-left: 10px;
          }
        }
        .radio{
          height: 100%;
        }
      }
    }
  }
}
</style>
