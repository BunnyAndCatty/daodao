<template>
  <div class="common_bottom_menu">
    <div class="menus">
      <div class="menu" v-for="(item, index) in options" :key="index">
        {{item}}
      </div>
      <div class="menu" v-if="canCancel">
        取消
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      canCancel: true
    }
  },
  props: {
    options: []
  }
  // methods: {
  //   handleClick (index) {
  //     // this.options[index].action && this.options[index].action()
  //   }
  // },
}
</script>
<style lang="less" scoped>
.common_bottom_menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(85, 85, 102, 0.5);
  z-index: 99;
  .menus {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #fff;
  }
  .menu {
    height: 50px;
    text-align: center;
    font-size: 16px;
    color: #556;
    line-height: 50px;
    width: 100%;
  }
}
</style>
