<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-aside v-if="aside" width="auto">
        <el-menu router :default-active="routePath" class="el-menu-vertical-demo" background-color="#4a5c73" unique-opened text-color="#fff" :collapse="isCollapse">
          <div class="left-tittle">
            <span v-if="!isCollapse" style="white-space: nowrap">后台管理系统</span>
            <i :class="collapseClass" style="font-size: 28px; cursor: pointer" @click="collapseClk"></i>
          </div>
          <el-menu-item index="/Home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页总览</span>
          </el-menu-item>
          <!-- <el-submenu :index="subItem.titId" v-for="subItem in $route" :key="subItem.titId">
            <template slot="title">
              <i :class="subItem.titIcon"></i>
              <span slot="title">{{ subItem.titName }}</span>
            </template>
            <el-menu-item :index="menuItem.path" v-for="menuItem in subItem.menuArr" :key="menuItem.index">
              <i :class="menuItem.icon"></i>
              <span slot="title">{{ menuItem.name }}</span>
            </el-menu-item>
          </el-submenu> -->
          <el-menu-item index="/user">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/analysis">
            <i class="el-icon-s-shop"></i>
            <span slot="title">站点分析</span>
          </el-menu-item>
          <el-menu-item index="/log">
            <i class="el-icon-s-order"></i>
            <span slot="title">系统日志</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container style="flex-direction: column">
        <el-header v-if="aside"
          >{{ cont }}
          <div class="logins">
            <span class="welcomes">欢迎:<span> admin </span></span>
            <i title="退出登录" @click="logOut" class="logOutSty el-icon-switch-button"></i>
          </div>
        </el-header>
        <el-main :class="{ main }">
          <div class="paddings" :style="{ height: main ? '' : '100%' }">
            <transition name="fade-transform" mode="out-in">
              <router-view />
            </transition>
          </div>
        </el-main>
        <el-footer v-if="aside">system ©2021 Created by yang</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      main: false,
      aside: true,
      isCollapse: false,
      collapseClass: 'el-icon-s-fold',
    }
  },
  computed: {
    routePath: {
      //高亮菜单
      get() {
        const { path } = this.$route
        return path
      },
      set(newValue) {
        return newValue
      },
    },
    cont: {
      //标题
      get() {
        const { path } = this.$route
        if (path == '/Home') return '首页总览'
      },
      set(newValue) {
        return newValue
      },
    },
  },
  methods: {
    // 退出登录
    logOut() {
      this.$message.success('退出成功!')
      this.$store.commit('SYS_USER', '')
      this.$router.push('/SignIn')
    },
    // 折叠/展开侧边栏
    collapseClk() {
      if (this.isCollapse) {
        this.isCollapse = false
        this.collapseClass = 'el-icon-s-fold'
      } else {
        this.isCollapse = true
        this.collapseClass = 'el-icon-s-unfold'
      }
      this.$store.commit('IS_COLLAPSE', this.isCollapse)
    },
  },
  watch: {
    // 监听路由地址变化
    $route: {
      handler(newVal, oldVal) {
        if (newVal.path == '/SignIn') {
          this.main = true
          this.aside = false
        } else {
          this.main = false
          this.aside = true
          if (newVal.path == '/user' || newVal.path == 'analysis' || newVal.path == 'log') {
            //没有包含的路由都跳首页
            this.$router.push(newVal.path)
          } else {
            this.$router.push('/Home')
          }
        }
      },
    },
  },
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
  height: 100%;
  font-size: 0.3rem;
}
// 头部和尾部
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  padding: 0 0.25rem !important;
  line-height: 60px;
}
// 头部
.el-header {
  background: #fff;
  z-index: 0;
  font-weight: bold;
}
// 尾部
.el-footer {
  text-align: center;
}
// 侧边栏
.el-aside {
  background-color: #4a5c73;
  color: #333;
  text-align: left;
}
// 中间
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  overflow: hidden !important;
}
body > .el-container {
  margin-bottom: 2.5rem;
  height: 100%;
}
// 标题
.left-tittle {
  color: #fff;
  padding: 6px 20px;
  height: 0.6rem;
  font-size: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
// 中间间距
.paddings {
  background: #fff;
  overflow: auto;
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
// 右上角登录模块
.logins {
  float: right;
  display: flex;
  align-items: center;
  .welcomes {
    margin-right: 10px;
    min-width: 10px;
    span {
      color: #409eff;
    }
  }
  > :last-child {
    font-weight: bold;
    cursor: pointer;
  }
}
.logOutSty {
  font-size: 0.4rem;
  -webkit-line-clamp: 2;
  background-image: -webkit-linear-gradient(top, #9359f2, #f63456);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
/*定义滚动条样式（高宽及背景）*/
::-webkit-scrollbar {
  width: 1px;
  background-color: #fff;
}
/*定义滚动条轨道（凹槽）样式*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px #fff;
  border-radius: 3px;
}
/*定义滑块 样式*/
::-webkit-scrollbar-thumb {
  border-radius: 1px;
  height: 100px; /* 滚动条滑块长度 */
  background-color: #fff;
}
.main {
  padding: 0 !important;
  .paddings {
    padding: 0 !important;
  }
}
// 删除字体大小
.el-message-box__content {
  font-size: 24px !important;
}
.el-message-box__btns {
  button {
    font-size: 18px;
  }
}
// 页面切换过渡效果
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
// 侧边栏折叠
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
