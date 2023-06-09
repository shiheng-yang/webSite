<template>
  <div class="title azjg">
    <div v-gxqy>
      管辖区域：
      <el-select v-model="cgxqy" placeholder="全部" @change="cxjgmc" clearable filterable>
        <el-option v-for="(i, n) in $store.state.areas" :key="n" :value="i.id" :label="i.name"></el-option>
      </el-select>
    </div>
    <div v-jgmc>
      机构名称：
      <el-select class="devSty" v-model="cjgmc" placeholder="全部" @change="getDatas" clearable filterable>
        <el-option v-for="(i, n) in cjgmcArr" :key="n" :value="i.id" :label="i.name"></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cgxqy: '', //查询管辖区域
      cjgmc: '', //查询机构名称
      cjgmcArr: [], //查询机构名称数组
      user: this.$store.state.setAreaOrg, //区域机构id
    }
  },
  methods: {
    // 查询机构名称
    cxjgmc() {
      this.cjgmc = ''
      this.cjgmcArr = []
      if (!this.cgxqy) {
        this.$emit('setData', [this.cgxqy])
        return
      }
      let params = {
        useFlag: 0,
        areaId: this.cgxqy,
        pageNo: 1,
        pageSize: 1000,
        useFlag: 0,
      }
      organizationQueryWithPage(params).then((data) => {
        if (data) {
          this.cjgmcArr = data.records
          this.$emit('setData', [this.cgxqy])
        }
      })
    },
    // 传两个值
    getDatas() {
      this.$emit('setData', [this.cgxqy, this.cjgmc])
    },
    // 初始化
    init() {
      this.cgxqy = this.user[0]
      this.cjgmc = this.user[1]
      if (this.cjgmc) this.$emit('setData', [this.cgxqy, this.cjgmc])
      if (this.cgxqy && !this.cjgmc) this.cxjgmc()
      if (!this.cgxqy && !this.cjgmc) this.$emit('setData', ['', ''])
    },
  },
  mounted() {
    this.init()
    // 清除下拉框
    this.$bus.$on('clickResert', (data) => {
      if (data == 1) {
        this.cjgmcArr = []
        this.init()
      }
    })
  },
}
</script>
<style lang="less" scoped>
.title {
  font-size: 16px;
  display: inline-block;
  input {
    margin-right: 10px;
    outline: none;
    height: 26px !important;
  }
  div {
    display: inline-block;
    height: 44px;
  }
}
// 页面中的select
.azjg {
  /deep/.el-select {
    margin-right: 8px;
  }
  /deep/.el-input--suffix {
    border: 1px solid #767676;
    border-radius: 4px;
    width: 174px;
  }
  /deep/.el-input--suffix .el-input__inner {
    height: 32px;
  }
}
// 下拉框内容背景色
.el-select-dropdown__item.selected,
.el-select-dropdown__item:hover {
  color: #fff;
  background: #409eff;
}
.devSty {
  /deep/.el-input--suffix {
    min-width: 210px;
  }
}
</style>
