<template>
  <div class="avatar" :style="style">
      <img src="../../static/images/avatar.png" v-if="type === 0"></img>
      <div v-else class="circle">
        <img src="../../static/images/catty.png" class="first"></img>
        <span class="second gray" v-if="avatar.length < 2"></span>
        <img src="../../static/images/catty.png" class="second" v-if="avatar.length > 1"></img>
        <span class="third gray" v-if="avatar.length < 3"></span>
        <img src="../../static/images/catty.png" class="third" v-if="avatar.length > 2"></img>
        <span class="fourth gray" v-if="avatar.length < 4"></span>
        <img src="../../static/images/catty.png" class="fourth" v-if="avatar.length > 3"></img>
      </div>  
  </div>
</template>

<script>
export default {
  // avatar是头像url数组；
  // height = width是圆圈直径，含两像素白边；
  // type为账单类型
  props: {
    avatar: {
      type: Array,
      default: [1, 2, 3]
    },
    height: {
      type: String,
      default: '42px'
    },
    type: {
      type: Number,
      default: 1 // 0表示个人账单，1表示共享账单
    }
  },
  computed: {
    style: function () {
      return 'height:' + this.height + ';width:' + this.height
    }
  }
}
</script>

<style lang="less" scoped>
.avatar{
  border-radius: 50%;
  overflow: hidden;
  img{
    height: 100%;
    width: 100%;
  }
  .circle{
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .first, .second, .third, .fourth{
      height: calc(50% - 1px);
      width: calc(50% - 1px);
      box-sizing: border-box;
    }
    .first{
      border-radius: 100%, 0, 0, 0;
      margin: 0 1px 1px 0;
    }
    .second{
      border-radius: 0, 100%, 0, 0;
      margin: 0 0 1px 1px;
    }
    .third{
      border-radius: 0, 0, 100%, 0;
      margin: 1px 1px 0 0;
    }
    .fourth{
      border-radius: 0, 0, 0, 100%;
      margin: 1px 0 0 1px;
    }
    .gray{
      background-color: gray;
    }
  }
}
</style>