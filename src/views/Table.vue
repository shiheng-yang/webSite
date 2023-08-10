<template>
  <div class="about">
    <div class="titles azjgs">
      <div>
        等级：
        <el-select v-model="clevels" placeholder="全部" clearable>
          <el-option :value="item.id" v-for="(item, index) in clevelArr" :key="index" :label="item.value"></el-option>
        </el-select>
      </div>
      <span>
        <el-button type="success" size="mini" icon="el-icon-search" @click="searchs(1, pagesize)">查 询</el-button>
        <el-button type="info" size="mini" icon="el-icon-refresh-right" @click="reserts">重 置</el-button>
        <el-button type="warning" size="mini" icon="el-icon-plus" @click="openDialog(0)">新 增</el-button>
      </span>
    </div>
    <div class="cont">
      <el-table :data="tableData" height="calc(100% - 40px)">
        <el-table-column prop="name" label="管辖区名称"></el-table-column>
        <el-table-column prop="levelId" label="等级">
          <template slot-scope="{ row }">
            <div>{{ clevelArr[row.levelId - 1].value }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="upperAreaName" label="上级区域名称"></el-table-column>
        <el-table-column prop="useFlag" label="状态">
          <template slot-scope="{ row }">
            <div>{{ row.useFlag == 0 ? '启用' : '禁用' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="160"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button @click="openDialog(1, row)" type="primary" size="small" icon="el-icon-edit-outline">编 辑</el-button>
            <el-button type="danger" size="small" @click="deletes(row.id)" icon="el-icon-close">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currpage" :page-sizes="[10, 20, 100, 500, 1000, 5000, 10000]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totals"> </el-pagination>
      <!-- 新增,编辑模态框 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :modal="true" :close-on-click-modal="false" v-dialogDrag @close="cancles" center>
        <div class="dialogsC">
          <div class="newDialog">
            <div>
              <span>区域名称：</span>
              <el-input placeholder="请输入区域名称" v-model="paramsObj.name" clearable></el-input>
            </div>
            <div>
              <span>等级：</span>
              <el-select v-model="paramsObj.levelId" @change="sjgxqy(1)" placeholder="全部" clearable :disabled="isUseFlag">
                <el-option :value="i.id" v-for="(i, n) in clevelArr" :key="n" :label="i.value"></el-option>
              </el-select>
            </div>
            <div>
              <span>上级区域名称：</span>
              <el-select v-model="paramsObj.upperAreaId" placeholder="全部" clearable :disabled="isUseFlag">
                <el-option :label="i.name" v-for="(i, n) in superiorArr" :key="n" :value="i.id"></el-option>
              </el-select>
            </div>
            <div v-if="isUseFlag">
              <span>状态：</span>
              <el-select v-model="paramsObj.useFlag" clearable>
                <el-option :value="0" label="启用"></el-option>
                <el-option :value="1" label="禁用"></el-option>
              </el-select>
            </div>
            <div>
              <span>备注：</span>
              <el-input placeholder="请输入备注" v-model="paramsObj.remark" clearable></el-input>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancles">取 消</el-button>
          <el-button type="primary" @click="totalConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      currpage: 1,
      pagesize: 10,
      totals: 0,
      tableData: [], //数据
      cgxqy: '', //区域名称名称
      cnamesArr: '', // 区域名称数组
      clevelArr: [
        { id: 1, value: 'A级' },
        { id: 2, value: 'B级' },
        { id: 3, value: 'C级' },
      ], // 查询等级数组
      clevels: '', // 查询等级
      superiorArr: [], //上级区域名称数组
      dialogTitle: '新增区域名称', //模态框标题
      dialogVisible: false, //模态框显影
      paramsObj: {}, //模态框字段
      paramsType: '', //新增编辑字段
      isUseFlag: false, //状态
    }
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pagesize = val
      this.searchs(this.currpage, val)
    },
    handleCurrentChange(val) {
      this.currpage = val
      this.searchs(val, this.pagesize)
    },
    // 查询
    searchs(currpage, pagesize) {
      const loading = this.$loading({
        lock: true,
        text: '拼命加载中......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('.about'),
      })
      this.tableData = [
        { name: 'Name 1', levelId: 1, upperAreaName: 'Upper Area 1', useFlag: false },
        { name: 'Name 2', levelId: 2, upperAreaName: 'Upper Area 2', useFlag: true },
        { name: 'Name 10', levelId: 1, upperAreaName: 'Upper Area 10', useFlag: true },
        { name: 'Name 1', levelId: 1, upperAreaName: 'Upper Area 1', useFlag: false },
        { name: 'Name 2', levelId: 2, upperAreaName: 'Upper Area 2', useFlag: true },
        { name: 'Name 10', levelId: 1, upperAreaName: 'Upper Area 10', useFlag: true },
        { name: 'Name 1', levelId: 1, upperAreaName: 'Upper Area 1', useFlag: false },
        { name: 'Name 2', levelId: 2, upperAreaName: 'Upper Area 2', useFlag: true },
        { name: 'Name 10', levelId: 1, upperAreaName: 'Upper Area 10', useFlag: true },
        { name: 'Name 1', levelId: 1, upperAreaName: 'Upper Area 1', useFlag: false },
        { name: 'Name 2', levelId: 2, upperAreaName: 'Upper Area 2', useFlag: true },
        { name: 'Name 10', levelId: 1, upperAreaName: 'Upper Area 10', useFlag: true },
        { name: 'Name 1', levelId: 1, upperAreaName: 'Upper Area 1', useFlag: false },
        { name: 'Name 2', levelId: 2, upperAreaName: 'Upper Area 2', useFlag: true },
        { name: 'Name 10', levelId: 2, upperAreaName: 'Upper Area 10', useFlag: true },
        { name: 'Name 1', levelId: 1, upperAreaName: 'Upper Area 1', useFlag: false },
        { name: 'Name 2', levelId: 2, upperAreaName: 'Upper Area 2', useFlag: true },
        { name: 'Name 10', levelId: 1, upperAreaName: 'Upper Area 10', useFlag: true },
        { name: 'Name 1', levelId: 1, upperAreaName: 'Upper Area 1', useFlag: false },
        { name: 'Name 2', levelId: 2, upperAreaName: 'Upper Area 2', useFlag: true },
        { name: 'Name 10', levelId: 1, upperAreaName: 'Upper Area 10', useFlag: true },
        { name: 'Name 1', levelId: 1, upperAreaName: 'Upper Area 1', useFlag: false },
        { name: 'Name 2', levelId: 2, upperAreaName: 'Upper Area 2', useFlag: true },
        { name: 'Name 10', levelId: 1, upperAreaName: 'Upper Area 10', useFlag: true },
        { name: 'Name 1', levelId: 1, upperAreaName: 'Upper Area 1', useFlag: false },
        { name: 'Name 2', levelId: 2, upperAreaName: 'Upper Area 2', useFlag: true },
        { name: 'Name 10', levelId: 2, upperAreaName: 'Upper Area 10', useFlag: true },
        { name: 'Name 1', levelId: 1, upperAreaName: 'Upper Area 1', useFlag: false },
        { name: 'Name 2', levelId: 2, upperAreaName: 'Upper Area 2', useFlag: true },
        { name: 'Name 10', levelId: 1, upperAreaName: 'Upper Area 10', useFlag: true },
      ]
      loading.close()
    },
    // 重置
    reserts() {
      this.clevels = ''
      this.currpage = 1
      this.pagesize = 10
      this.searchs(1, 10)
    },
    // 取消
    cancles() {
      this.paramsObj = {}
      this.dialogVisible = false
    },

    // 展开模态框
    openDialog(type, row) {
      this.paramsType = type
      if (type == 0) {
        //新增
        this.dialogTitle = '新增区域名称'
        this.isUseFlag = false
        this.paramsObj.useFlag = 0
      } else {
        //编辑
        this.paramsObj = Object.assign({}, row)
        this.sjgxqy()
        this.dialogTitle = '编辑区域名称'
        this.isUseFlag = true
      }
      this.dialogVisible = true
    },
    // 新增，编辑确认
    totalConfirm() {
      if (!this.paramsObj.name) {
        this.$message.error('区域名称不能为空')
        return
      }
      if (!this.paramsObj.levelId) {
        this.$message.error('等级不能为空')
        return
      }
      if (this.paramsObj.levelId != 1 && this.paramsObj.upperAreaId == '') {
        this.$message.error('上级区域名称不能为空')
        return
      }
      if (String(this.paramsObj.useFlag) == '' && this.paramsType == 1) {
        this.$message.error('状态不能为空')
        return
      }
      this.paramsObj = qs.stringify(this.paramsObj)
      if (this.paramsType == 0) {
        areaSave(this.paramsObj).then((data) => {
          if (data) this.returnState(data)
        })
      } else {
        areaUpdate(this.paramsObj).then((data) => {
          if (data) this.returnState(data)
        })
      }
    },
    // 删除
    deletes(id) {
      this.$confirm('是否删除该条数据?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          areaDeleteById(qs.stringify({ id })).then((data) => {
            if (data) {
              let deleteAfterPage = Math.ceil((this.totals - 1) / this.pagesize)
              let currentPage = this.currpage > deleteAfterPage ? deleteAfterPage : this.currpage
              this.currpage = currentPage < 1 ? 1 : currentPage
              this.returnState(data)
            }
          })
        })
        .catch(() => {})
    },
    // 返回状态
    returnState(data) {
      this.$message.success(data.message)
      this.cancles()
      this.searchs(this.currpage, this.pagesize)
      this.newGxqy()
    },
    // 上级区域名称
    sjgxqy(a) {
      if (a == 1) this.$set(this.paramsObj, 'upperAreaId', '') //修改数据更新视图
      if (this.paramsObj.levelId == 2 || this.paramsObj.levelId == 3) {
        queryWithPage({ levelId: 1 }).then((data) => {
          this.superiorArr = data.result.records
        })
      } else {
        this.superiorArr = []
      }
    },
    // 除市级以外的所有区域名称
    newGxqy() {
      let params = {
        useFlag: 0,
        pageNo: 1,
        pageSize: 10000,
      }
      queryWithPageAll(params).then((data) => {
        if (data) {
          sessionStorage.setItem('gxqylist', JSON.stringify(data.result.records))
          this.cnamesArr = data.result.records
        }
      })
    },
  },
  mounted() {
    // this.cgxqy = this.$store.state.areaAndOrg[0]
    // this.cnamesArr = JSON.parse(sessionStorage.getItem('gxqylist')) //区域名称数组
    this.searchs(1, 10)
  },
}
</script>
<style src="../../public/css/search.less" lang="less" scoped></style>
<style lang="less" scoped>
.cont {
  width: 100%;
  height: calc(100% - 50px);
}
.about {
  // position: relative;
}
</style>
