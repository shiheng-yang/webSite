<template>
  <div class="container">
    <div class="titles">
      <div>
        <img src="../../../public/img/logo2.jpg" alt="" />
      </div>
      <div>
        <h3>后台管理系统</h3>
        <h5>Background Management System</h5>
      </div>
    </div>
    <div class="login_box">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item prop="usename">
          <i class="el-icon-user-solid"></i>
          <el-input v-model="ruleForm.usename" autocomplete="off" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <i class="el-icon-lock"></i>
          <el-input show-password v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 粒子背景 -->
    <vue-particles class="login-bg" color="#39AFFD" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle" :particleSize="4" linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" style="height: 100%"> </vue-particles>
    <div class="footers">system ©2023 Created by yang</div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        usename: '',
        password: '',
      },
      rules: {
        usename: [{ required: true, trigger: 'blur', message: '请输入账号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
      },
    }
  },
  methods: {
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit('SYS_USER', this.ruleForm.usename)
          this.$router.push('/Home')
        } else {
          this.ruleForm = {}
          return false
        }
      })
    },
    // 回车登录
    keyDown(e) {
      if (e.keyCode == 13) {
        if (this.ruleForm.usename != '' && this.ruleForm.password != '') {
          this.logoin()
        } else {
          this.submitForm('ruleForm')
          this.$message.error('请输入账号或密码')
        }
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown)
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  },
}
</script>
<style lang="less" scoped>
// 最大的盒子
.container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
// 登录盒子
.login_box {
  width: 20%;
  height: 33%;
  background-color: rgba(107, 110, 114, 0.5);
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
// 表单最大盒子
.el-form {
  padding: 0 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: #fff;
}
// 按钮
.el-button {
  width: 100%;
}
/deep/.el-form-item__label {
  color: #fff;
}
/deep/.el-form-item {
  margin: 0;
}
// 输入框背景色
/deep/.el-input__inner {
  background: transparent;
  color: #fff;
  padding: 0 0 0 28px;
}
// 图标位置
/deep/.el-icon-user-solid,
/deep/.el-icon-lock {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(0%, -50%);
}
// 提示字
/deep/.el-input__inner {
  &::placeholder {
    color: #999;
    font-size: 16px;
  }
}
// 粒子背景
.login-bg {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
}
// 标题
.titles {
  position: absolute;
  top: 4%;
  color: #fff;
  font-size: 30px;
  left: 50%;
  display: flex;
  align-items: center;
  transform: translate(-50%, 0%);
  justify-content: center;
  img {
    width: 66%;
    border-radius: 50%;
  }
  h3,
  h5 {
    margin: 0;
  }
  > :first-child {
    display: flex;
    justify-content: center;
    width: 30%;
  }
}
// 底部
.footers {
  position: absolute;
  left: 50%;
  bottom: 3%;
  color: #aaa;
  transform: translate(-50%, -50%);
}
</style>
