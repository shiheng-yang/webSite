<template>
  <div class="about">
    <div id="myMap"></div>
  </div>
</template>
<script>
import '@/util/myMap.js'

let myChartMap = null //地图
export default {
  name: 'about',
  data() {
    return {
      optionMap: {
        tooltip: {
          formatter(data) {
            return `${data.marker} ${data.name}`
          },
        },
        geo: {
          map: '江苏苏州',
          roam: true,
          zoom: 1.2,
          scaleLimit: {
            //缩放级别限制
            min: 1,
          },
          aspectScale: 1.1, //地图的长宽比
          itemStyle: {
            borderWidth: 2,
            borderColor: '#0090fe', //边框颜色
            areaColor: '#003399', //地图区域颜色
            shadowColor: '#182f68',
            shadowOffsetX: 0,
            shadowOffsetY: 15,
          },
          label: {
            color: '#fff',
            fontWeight: 'bold',
            show: true,
          },
          emphasis: {
            itemStyle: {
              show: 'true',
              borderWidth: 4,
              borderColor: '#b2163c', //边框颜色
              areaColor: '#531f67', //鼠标移上去的颜色
            },
            label: {
              color: '#fff',
              fontWeight: 'bold',
              show: true,
            },
          },
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: '10',
            symbol: 'circle',
            itemStyle: { color: 'orange' },
          },
        ],
      },
      user: this.$store.state.setAreaOrg, //区域机构id
    }
  },
  methods: {
    // 查询地图上的机构点
    secaorange() {
      myChartMap = this.$echarts.init(document.getElementById('myMap'))
      let params = {
        areaId: this.user[0],
        id: this.user[1],
        useFlag: 0,
        pageSize: 1000,
      }
      organizationQueryWithPage(params).then((data) => {
        if (data) {
          var dataObj = {}
          data.records.forEach((v) => {
            dataObj = {
              name: v.name,
              value: [Number(v.longitude), Number(v.latitude), v.id],
            }
            this.optionMap.series[0].data.push(dataObj)
          })
          this.optionMap.series[0].data = JSON.parse(JSON.stringify(this.optionMap.series[0].data))
          myChartMap.setOption(this.optionMap)
          window.addEventListener('resize', () => {
            myChartMap.resize()
          })
        }
      })
    },
  },
  mounted() {
    this.secaorange()
  },
}
</script>
<style lang="less">
.about {
  height: 100%;
}
#myMap {
  width: 100%;
  height: 50.5vh;
}
</style>
