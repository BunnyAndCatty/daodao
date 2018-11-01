<template>
  <div class="container" ref="container">
    <div class="title">
      <div class="expenses">
        <div class="month_total">
          <div class="desc">本{{rangePickerValue}}花费(元)</div>
          <div class="total_money">70</div>
        </div>
        <div class="month_select">
          <picker class="weui-btn" @change="rangePickerChange" :range="rangePickerArray">
            <span>{{rangePickerValue}}
              <img src="../../../static/images/down.png" class="img_down">
            </span>
          </picker>
          <picker class="weui-btn" @change="singlePickerChange" :range="singlePickerArray" v-if="rangePickerValue === '年'">
            <span>{{singlePickerValue}}
              <img src="../../../static/images/down.png" class="img_down">
            </span>
          </picker>
          <picker class="weui-btn" mode="multiSelector" @change="multiPickerChange" :range="multiPickerArray" v-else>
            <span>{{multiPickerValue}}
              <img src="../../../static/images/down.png" class="img_down">
            </span>          
          </picker>
        </div>
      </div>
      <div class="income">
        <div>本{{rangePickerValue}}收入 {{0}}</div>
      </div>
    </div>
    <div v-if="!already_get_setting" class="not_get_setting">
      <div class="tips">请先登录哦</div>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">立即登录</button>
      <button open-type="openSetting">打开授权设置页</button>
    </div>
    <div v-else class="already_get_setting">
      <div class="action">
        <div>筛选</div>
        <div class="formality_select" >
          <span @click="selectFormality_list" :class="{activeFormality: activeFormality===0}">账单</span>
          <span @click="selectFormality_chart" :class="{activeFormality: activeFormality===1}">图表</span>
        </div>
        <div>搜索</div>
      </div>
      <div class="dataList">
        <div v-if="activeFormality===0">
          <div v-if="rangePickerValue==='年'" class="month_card">
            <div class="month_title">
              <span>
                <img src="../../../static/images/calender.png" class="img_calender">
                <span>10月</span>
              </span>
              <span>
                <div>花费</div>
                <div class="number">253.00</div>
              </span>
              <span>
                <div>收入</div>
                <div class="number">58.00</div>
              </span>
              <span>
                <div>结余</div>
                <div class="number">-195.00</div>
              </span>
              <img src="../../../static/images/down.png" class="img_down" @click="show_month_detail">
            </div>
            <div v-if="month_detail" class="month_detail">
              <list-item></list-item> 
              <list-item></list-item> 
              <list-item></list-item>
              <list-item></list-item>
              <list-item></list-item>
              <list-item></list-item>
              <list-item></list-item>
            </div>
          </div>
          <div v-else class="date_card">
            <div class="date_title">
              <span>
                <img src="../../../static/images/calender.png" class="img_calender">
                <span>10月25日</span>
              </span>
              <span>
                <span>花费</span>
                <span class="number">8.00</span>
              </span>
            </div>
            <div class="date_detail">
              <list-item></list-item>
              <list-item></list-item>  
              <list-item></list-item>
            </div>
          </div>
        </div>
        <div v-if="activeFormality===1" class="canvasContainer">
          <canvas canvas-id="canvas" style="width: 320px; height: 320px;" @click="canvasTab"></canvas>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import getSetting from '../../utils/getSetting'
import request from '../../api/request'
import listItem from '../../components/listItem'
var Wxcharts = require('../../utils/wxcharts.js')

export default {
  data () {
    return {
      already_get_setting: false,
      rangePickerArray: ['年', '月'],
      rangePickerValue: '月',
      singlePickerArray: ['2015', '2016', '2017', '2018', '2019'],
      singlePickerValue: '2018',
      multiPickerArray: [['2015', '2016', '2017', '2018', '2019'], ['01', '02', '03', '04', '05']],
      multiPickerValue: '2018-09',
      activeFormality: 1,
      billList: [
        {
          month: '10月',
          pay: '-220.00',
          income: '58.00',
          total: '-162.00',
          bill: [
            {
              tag: '鞋服',
              date: '10月24日',
              icon: '../../static/images/calender.png',
              money: '-90',
              classificationId: '1',
              billId: '0'
            },
            {
              tag: '鞋服',
              date: '10月24日',
              icon: '../../static/images/calender.png',
              money: '-90',
              classificationId: '1',
              billId: '1',
              billTag: '去旅行'
            },
            {
              tag: '鞋服',
              date: '10月24日',
              icon: '../../static/images/calender.png',
              money: '-90',
              classificationId: '1',
              billId: '0'
            }
          ]
        }
      ],
      month_detail: true
    }
  },

  components: {
    listItem
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
    rangePickerChange (e) {
      this.rangePickerValue = this.rangePickerArray[e.mp.detail.value]
    },
    singlePickerChange (e) {
      this.singlePickerValue = this.singlePickerArray[e.mp.detail.value]
    },
    multiPickerChange (e) {
      this.multiPickerValue = this.multiPickerArray[0][e.mp.detail.value[0]] + '-' + this.multiPickerArray[1][e.mp.detail.value[1]]
    },
    selectFormality_list (e) {
      //  获取账单
      this.activeFormality = 0
    },
    selectFormality_chart (e) {
      //  获取图表
      /* eslint-disable no-new */
      global.wxcharts = new Wxcharts({
        canvasId: 'canvas',
        type: 'ring',
        // 副标题
        title: {
          name: '收入',
          fontSize: 14,
          color: 'black'
        },
        // 主标题
        subtitle: {
          name: '花费',
          fontSize: 14,
          color: 'red'
        },
        extra: {
          ringWidth: 20
        },
        series: [{
          name: '成交量1',
          data: 15
        }, {
          name: '成交量2',
          data: 35
        }, {
          name: '成交量3',
          data: 78
        }, {
          name: '成交量4',
          data: 63
        }],
        width: 320,
        height: 320,
        dataLabel: true
      })
      this.activeFormality = 1
    },
    canvasTab () {
      global.wxcharts.updateData({
        title: {
          name: '花费'
        },
        subtitle: {
          name: '收入'
        }
      })
    },
    _getRecordLlist () {
      request({
        url: '/cashbook/record/list'
      })
    },
    show_month_detail () {
      this.month_detail = !(this.month_detail)
    }
  },

  computed: {
  },
  created () {
    this._getRecordLlist()
  },
  mounted () {
    this.activeFormality = 0
  },
  onShow () {
    getSetting()
      .then(() => {
        this.already_get_setting = true
      })
      .catch()
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 10px 0 0 0;
  height: 100vh;
  justify-content: flex-start;
  font-size: 16px;
  .title{
    width: 100%;
    background-color: rgb(255,204,0);
    padding: 20px;
    box-sizing: border-box;
    .expenses {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .month_select {
      display: flex;
      flex-direction: row;
      justify-content: center;
      .weui-btn{
        margin: 0;
      }
      .img_down{
        width: 12px;
        height: 12px;
      }
      span {
        border: 1px solid red;
        border-radius: 30px;
        padding: 0 10px;
        margin-left: 10px;
      }
    }
    .income{
      margin-top: 20px;
    }
  }
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
  .already_get_setting{
    width: 100%;
    height: calc(100% - 126px);
    .action{
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      margin-bottom: 5px;
      div{
        height: 30px;
        line-height: 30px;
      }
      .formality_select{
        border: 1px solid gray;
        border-radius: 30px;
        height: 30px;
        span:nth-child(1){
          border-right: 1px solid gray;
          border-radius: 30px 0 0 30px;
        }
        span:nth-child(2){
          border-radius: 0 30px 30px 0;
        }
        span{
          box-sizing: border-box;
          padding: 5px 10px 6px 10px;
          font-size: 15px;
          height: 30px;
          line-height: 30px;
        }
        .activeFormality{
          background-color: rgb(255,204,0);
        }
      }
    }
    .dataList{
      width: 100%;
      background-color: #eeeeee;
      overflow: scroll;
      height: calc(~'100% - 50px');
      .img_calender{
        width: 20px;
        height: 20px;
      }
      .img_down{
        width: 12px;
        height: 12px;
      }
      .month_card, .date_card{
        background-color: #ffffff;
        margin-bottom: 10px;
      }
      .month_title, .date_title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        span{
          text-align: center;
        }
        span:nth-child(1){
          display: flex;
          align-items: center;
          img{
            margin-right: 10px;
          }
        }
      }
      .month_card{
        .month_title{
          .img_down{
            width: 20px;
            height: 20px;
          }
          .number{
            margin-top: 1px;
          }
        }
      }
      canvas{
        display: block !important;
      }
      .canvasContainer{
        width: 100%;
        box-sizing: border-box;
        padding: 0 calc(~'50% - 160px');
        overflow-x: hidden;
      }
    }
  }
}
</style>


