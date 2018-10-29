<template>
  <div class="listItem">
    <div class="left">
      <img src="../../static/images/clothes.png">
      <div class="tags">
        <div>
          <span class="tag">餐饮</span>
          <span class="circle">姐妹淘</span>
        </div>
        <div class="dateAndDesc">
          <!-- 按月没有日期，按年有日期 -->
          <span v-if="false" class="date">10月29日</span>
          <span>午饭</span>
        </div>
      </div>
    </div>
    <div class="money">23.00</div>
  </div>
</template>

<script>
export default {
  props: {}
}
</script>

<style lang="less" scoped>
.listItem{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin:30px 10px;

  .left{
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
      width: 30px;
      height: 30px;
    }
    .tags{
      margin-left: 10px;
      .circle{
        border: 1px solid red;
        padding: 1px 10px;
        margin-left: 10px;
        border-radius: 20px;
      }
      .dateAndDesc{
        margin-top: 5px;
        .date{
          margin-right: 10px;
        }
      }
    }
   
  }
  .money{

  }
}
</style>