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
      <div v-if="activeFormality===1">

      </div>
    </div>
    </div>
  </div>
</template>

<script>
import request from '../../api/request'
import listItem from '../../components/listItem'

export default {
  data () {
    return {
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
      this.activeFormality = 1
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
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 10px 0 0 0;
  height: 100vh;
  overflow: scroll;
  justify-content: flex-start;
  font-size: 16px;
  .title{
    width: 100%;
    background-color: orange;
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
        background-color: orange;
      }
    }
  }
  .dataList{
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
    overflow: scroll;
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
  }
}
</style>


