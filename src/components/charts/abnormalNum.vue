<template>
  <div id="box">
    <div id="fourMain"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'slot-temp',
  data() {
    return {
      option: {
        title: {
          text: '异常个数统计',
          left: 'center',
          top: '3%',
          textStyle: { fontSize: 14, color: '#fff' },
        },
        xAxis: {
          name: '日期',
          type: 'category',
          nameTextStyle: { color: '#fff' },
          axisLine: { show: true },
          axisLabel: { color: '#fff' },
          splitLine: { show: false },
          boundaryGap: false,
          data: [],
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '3%',
          bottom: '10%',
        },
        tooltip: {
          trigger: 'axis', //触发类型
          backgroundColor: 'rgba(255,255,255,1)', //背景
          textStyle: { color: 'black' },
          axisPointer: {
            //鼠标更随
            type: 'cross',
            label: {
              backgroundColor: '#0c1441',
              color: '#fff',
              borderColor: '#aaa',
              borderWidth: '1',
            },
          },
        },
        yAxis: {
          type: 'value',
          name: '单位(个)',
          nameGap: 10,
          nameTextStyle: { color: '#fff' },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)',
            },
          },
          axisLine: { show: true },
          axisLabel: { show: true, color: '#d1e6eb' },
          axisTick: { show: true },
        },
        color: '#5470c6',
        series: [
          {
            data: [],
            type: 'line',
            symbolSize: 10,
            name: '异常个数',
          },
        ],
      },
      chartDom: null,
    }
  },
  watch: {
    '$store.state.isCollapse': {
      handler(newVal, oldVal) {
        setTimeout(() => {
          this.chartDom.resize()
        }, 500)
      },
    },
  },
  mounted() {
    this.chartDom = echarts.init(document.getElementById('fourMain'))
    analysisGetExceptionCount().then((data) => {
      if (data) {
        data.forEach((v) => {
          this.option.xAxis.data.push(v.createDt)
          this.option.series[0].data.push(v.count)
        })
        this.chartDom.setOption(this.option)
        window.addEventListener('resize', () => {
          this.chartDom.resize()
        })
      }
    })
  },
}
</script>
<style lang="less" scoped>
#box {
  width: 100%;
  height: 100%;
}
#fourMain {
  width: 100%;
  height: 100%;
}
</style>
