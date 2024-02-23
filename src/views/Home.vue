<template>
  <div class="home">
    <div>{{ times }}</div>
    <div>111111111111</div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      times: '', // 当前时间
    }
  },
  methods: {
    // 时间调用函数
    timesfun() {
      setInterval(() => {
        this.times = this.$formatterDate.yearToSecond(new Date())
      }, 1000)
    },
  },
  mounted() {
    this.timesfun()
  },
}
</script>
<style lang="less" scoped>
@font-face {
  font-family: ysh;
  src: url('../../public/icon/DS-DIGIT.TTF');
}
.home {
  height: 100%;
  font-family: ysh;
  font-size: 1rem;
  text-align: center;
  background-image: -webkit-linear-gradient(left, #ff3700, #7d7bff, #1bff6c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
