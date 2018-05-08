<template>
  <div class="login">
    <div class="panel">
      <div class="panel_head">
        <h2 style="font-family: 方正舒体; font-size:24px">实验室质量管理管理系统</h2>
      </div>
      <div class="panel_content">

        <el-form :model="loginForm" label-width="70px" class="form-condensed">
          <el-form-item label="用户名" prop="pass" style="font-family: 方正舒体">
            <el-input v-model="loginForm.userName" placeholder="请输入用户名" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="密   码" prop="checkPass" style="font-family: 方正舒体">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item style="float: left;margin: 0" >
            <el-tooltip content="登录" placement="bottom">
            <el-button type="success" icon="el-icon-check" circle @click="submitForm('loginForm')" style="float: left;margin: 0 0 30px"></el-button>
            </el-tooltip>
            <el-tooltip content="注册" placement="bottom">
              <el-button type="primary" icon="el-icon-plus" circle style="float: left;margin-left: 30px"></el-button>
            </el-tooltip>
          </el-form-item>
          <el-tooltip content="重置密码" placement="bottom">
          <el-button type="info" icon="el-icon-refresh" circle @click="resetForm()" style="float: left;margin-left: 30px"></el-button>
          </el-tooltip>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  import login from "../api/LoginAPI"
  import * as Model from "../api/system/ConfigOption.js"

  let cookies = require('browser-cookies');

  export default {
    name: "login",
    data() {
      return {
        loading: false,
        loginForm: {
          userName: 'Monicase',
          password: '123456',
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
        self.loginForm.password = "";
      }
    },
  }
</script>

<style scoped>
  .login {
    background: url("../assets/font/2.jpg") right;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .panel {
    width: 400px;
    margin:80px 150px;
    border: 1px solid #c0bfc9;
    border-radius: 45px;
    background-color: white;
  }

  .panel_content {
    padding-left: 0px;
    min-height: 190px;

  }

  .panel_head {
    min-height: 70px;
    margin-top: 1px;
    position: relative;
  }

  .panel_head h2 {
    margin: 10px 0 0 20px;
    padding: 0;
    line-height: 70px;
  }

  .form-condensed {
    display: block;
    margin-left: 30px;
    width: 300px;
    margin-right: 10px;
    padding-top: 20px;
  }
</style>
