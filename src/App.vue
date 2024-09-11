<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-aside width="auto">
        <el-menu router :default-active="routePath" class="el-menu-vertical-demo" background-color="#606266" unique-opened text-color="#fff" :mode="mode">
          <div class="left-tittle">
            <span style="white-space: nowrap">后台管理系统</span>
          </div>
          <el-menu-item index="/Home">
            <i class="el-icon-s-home"></i>
            <span slot="title">测试</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container style="flex-direction: column">
        <el-main>
          <div class="paddings">
            <transition name="fade-transform" mode="out-in">
              <router-view />
            </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      loadingText: {
        lock: true,
        text: '拼命加载中......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
      },
      mode: 'vertical',
    }
  },
  computed: {
    routePath: {
      //高亮菜单
      get() {
        const currentRoute = this.$route
        const { path } = currentRoute
        return path
      },
      set(newValue) {
        return newValue
      },
    },
  },
  methods: {},
  mounted() {
    let defaultMenu = window.location.hash.substr(window.location.hash.indexOf('/'))
    if (defaultMenu == '/') {
      this.$router.push('/Home')
    }
  },
}
</script>
<style lang="less">
// 整体
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100%;
  font-size: 0.3rem;
}
// 侧边栏
.el-aside {
  background-color: #606266;
  color: #333;
  text-align: left;
}
// 中间
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  overflow: hidden !important;
  padding: 10px !important;
}
body > .el-container {
  margin-bottom: 2.5rem;
  height: 100%;
}
// 标题
.left-tittle {
  color: #fff;
  padding: 6px 20px;
  height: 50px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
// 中间间距
.paddings {
  background: #fff;
  overflow: auto;
  border-radius: 6px;
}
.el-submenu__title i,
.el-menu-item i {
  color: #fff !important;
}
.el-menu-item.is-active,
.el-menu-item:hover,
.el-submenu__title:hover {
  background-color: #409eff !important;
  color: #fff !important;
  i {
    color: orange !important;
  }
}

// 页面切换过渡效果
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateY(-100px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.paddings {
  padding: 0 !important;
  height: 100%;
  overflow: hidden;
}
</style>
