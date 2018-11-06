<template>
  <div class="numberKeyboard">
    <div v-for="(item, index) in numberList" @click="clickButton(item, index)">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      result: [],
      value: 0.00,
      numberList: ['7', '8', '9', '+', '-', '4', '5', '6', '*', '/', '1', '2', '3', '=', '.', '0', '删除', '完成']
    }
  },
  methods: {
    clickButton (item) {
      switch (item) {
        case ('.'):
          if (this.result.length === 0) {
            this.result.push('0')
            this.result.push(item)
          } else if (isNaN(+this.result[this.result.length - 1])) {
          } else if (this._judgeDian(this.result)) {
          } else {
            this.result.push(item)
          }
          break
        case ('+'):
        case ('-'):
        case ('*'):
        case ('/'):
          if (this.result.length === 0) {
            this.result.push('0')
            this.result.push(item)
          } else if (isNaN(+this.result[this.result.length - 1])) {
          } else if (this.result.some(item => {
            return isNaN(+item) && item !== '.'
          })) {
            // 计算
            this._compute(item)
          } else {
            this.result.push(item)
          }
          break
        case ('删除'):
          if (this.result.length === 1) {
            this.result[0] = this.result[0].split('').splice(0, this.result[0].split('').length - 1).join('')
          } else {
            this.result.splice(-1, 1)
          }
          if (this.result.length === 1 && this.result[0] === '') {
            this.result = []
            this.value = 0.00
          }
          break
        case ('='):
          if ((this.result[this.result.length - 1] === '0' && this.result[this.result.length - 2] === '/') || isNaN(+this.result[this.result.length - 1])) {
          } else {
            // 计算
            this._compute()
          }
          break
        default:
          this.result.push(item)
          break
      }
      console.log(this.result)
      this.$emit('clickKeyboard', this.result)
    },
    _compute (item) {
      let action = ''
      this.result.forEach((element, index) => {
        if (['+', '-', '*', '/'].indexOf(element) !== -1) {
          action = element
        }
      })
      if (action === '') {
        return
      }
      let resultString = this.result.join('')
      let firstNum = +resultString.split(action)[0]
      let secondNum = +resultString.split(action)[1]
      if (action === '+') {
        this.value = firstNum + secondNum
      } else if (action === '-') {
        this.value = firstNum - secondNum
      } else if (action === '*') {
        this.value = firstNum * secondNum
      } else {
        this.value = firstNum / secondNum
      }
      let temp = String(this.value)
      this.result = temp.indexOf('.') === -1 ? [temp] : [temp.substring(0, temp.indexOf('.') + 3)]
      if (item) {
        this.result.push(item)
      }
      // console.log(this.result)
    },
    _judgeDian (array) {
      let dianItemIndex = -1
      let dianIndex = -1
      let actionIndex = -1
      array.forEach((item, index) => {
        if (['+', '-', '*', '/'].indexOf(item) !== -1) {
          actionIndex = index
        }
        if (item.indexOf('.') !== -1) {
          dianItemIndex = index
        }
        if (item === '.') {
          dianIndex = index
        }
      })
      if ((dianIndex !== -1 || dianItemIndex !== -1) && actionIndex === -1) {
        return true
      } else if (dianIndex !== -1 && actionIndex !== -1 && dianIndex > actionIndex) {
        return true
      } else if (dianItemIndex !== -1 && actionIndex !== -1 && dianItemIndex > actionIndex) {
        return true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.numberKeyboard{
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: left;
  width: 100%;
  flex-wrap: wrap;
  height: 160px;
  div{
    text-align: center;
    width: 25%;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
  }
  div:nth-child(4),
  div:nth-child(5),
  div:nth-child(9),
  div:nth-child(10){
    width: 12.5%;
    flex-grow: 1;
  }
  div:nth-last-child(1){
    background-color: yellow;
  }

}
</style>