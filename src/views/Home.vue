<template>
  <div class="home">
    <el-table :data="tableData" height="100%">
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column prop="view" label="查看按钮权限" width="120">
        <template slot-scope="{ row }">
          <el-switch v-model="row.view" active-color="#13ce66" :active-value="1" :inactive-value="0" inactive-color="#ff4949" @change="chgSwitch(row, 0)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="edit" label="编辑按钮权限" width="120">
        <template slot-scope="{ row }">
          <el-switch v-model="row.edit" active-color="#13ce66" :active-value="1" :inactive-value="0" inactive-color="#ff4949" @change="chgSwitch(row, 1)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="del" label="删除按钮权限" width="120">
        <template slot-scope="{ row }">
          <el-switch v-model="row.del" active-color="#13ce66" :active-value="1" :inactive-value="0" inactive-color="#ff4949" @change="chgSwitch(row, 2)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" :width="formatBtnWidth">
        <template slot-scope="{ row }">
          <div class="btnList">
            <el-button v-if="row.view" type="success" size="small" icon="el-icon-edit-outline">查 看</el-button>
            <el-button v-if="row.edit" type="primary" size="small" icon="el-icon-edit-outline">编 辑</el-button>
            <el-popconfirm title="确认删除?" icon="el-icon-warning" cancel-button-type="">
              <el-button v-if="row.del" slot="reference" type="danger" size="small" icon="el-icon-close">删 除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      tableData: [
        { view: 0, edit: 0, del: 0, date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { view: 0, edit: 0, del: 0, date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
        { view: 0, edit: 0, del: 0, date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },
        { view: 0, edit: 0, del: 0, date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄' },
        { view: 0, edit: 0, del: 0, date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { view: 0, edit: 0, del: 0, date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
        { view: 0, edit: 0, del: 0, date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },
        { view: 0, edit: 0, del: 0, date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄' },
      ],
      formatBtnWidth: 120,
      view: '1',
      edit: '1',
      del: '1',
    }
  },
  methods: {
    chgSwitch(row, flag) {
      this.$nextTick(() => {
        this.formatBtnWidth = this.$formatBtnWidth()
      })
    },
  },
  mounted() {},
}
</script>
<style lang="less" scoped>
// 背景颜色
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.el-button {
  margin: 0 5px !important;
}
.btnList {
  white-space: nowrap;
  display: inline-block;
}
/deep/.el-table td,
/deep/.el-table th {
  text-align: center;
  height: 60px;
}
</style>
