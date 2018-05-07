<template>
  <div class="login">
    <div class="panel">
      <div class="panel_head">
        <h4>实验室质量管理管理系统</h4>
      </div>
      <div class="panel_content">

        <el-form :model="loginForm" label-width="70px" class="form-condensed">
          <el-form-item label="用户名" prop="pass">
            <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  import login from "../api/Login"
  import * as Model from "../api/system/ConfigOption.js"

  let cookies = require('browser-cookies');

  export default {
    name: "login",
    data() {
      return {
        loading: false,
        loginForm: {
          userName: 'jin',
          password: 123456,
        },
        controlVariable: {
          hasTryName: "",
        },
        user:{}
      }
    },

    methods: {
      async storageFun() {
          let options = localStorage.getItem("configOption")
          if(options !== undefined) {
            localStorage.removeItem("configOption");
          }
          let result  = await Model.default.getConfigOptionList()
          if(result.status) {
            localStorage.setItem("configOption", JSON.stringify(result.records))
          }
      },
      async submitForm(loginFrom) {
        let self = this;
        // 数据验证
        if (self.loginForm.userName === "" || self.loginForm.password === "") {
          this.$message({
            message: '用户名和密码不能为空！',
            type: 'warning'
          });
          return;
        }

        // 打开Loading
        let result = await login.login(this.loginForm);
        if (result.status) {
          await this.storageFun();
          cookies.set('userName', result.detail.userName);
          cookies.set('loginStatus', 'true');
          this.$router.push('/laboratory/laboratory');
        } else {
          this.$message({
            message: '用户名或密码错误',
            type: 'error'
          });
          this.$router.push('/');
        }
        // 关闭Loading
      },

      resetForm() {
        let self = this;
        self.loginForm.userName = "";
        self.loginForm.password = "";
      }
    },
  }
</script>

<style scoped>
  .login {
    background-color: #d9d8e2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .panel {
    width: 550px;
    margin: 12% auto 0;
    border: 1px solid #c0bfc9;
    background-color: white;
  }

  .panel_content {
    padding-left: 110px;
    min-height: 161px;
    background: white url('../assets/font/logo.png') no-repeat 20px top;
  }

  .panel_head {
    min-height: 70px;
    background-color: rgba(167, 215, 255, 0.78);
    border-bottom: 1px solid #dfdfdf;
    position: relative;
  }

  .panel_head h4 {
    margin: 0 0 0 20px;
    padding: 0;
    line-height: 70px;
    font-size: 17px;
  }

  .form-condensed {
    display: block;
    margin-left: 165px;
    margin-right: 10px;
    padding-top: 20px;
  }
</style>
