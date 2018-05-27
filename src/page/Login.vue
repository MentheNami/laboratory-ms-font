<template>
  <div class="login">
    <div class="panel">
      <div class="panel_head">
        <h2 style="font-family: 方正舒体,serif; font-size:24px">实验室质量管理系统</h2>
      </div>
      <div class="panel_content">
        <el-form :model="loginForm" label-width="70px" class="form-condensed">
          <el-form-item label="用户名" prop="pass" style="font-family: 方正舒体,serif">
            <el-input v-model="loginForm.userName" placeholder="请输入用户名" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="密   码" prop="checkPass" style="font-family: 方正舒体,serif">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item style="float: left;margin: 0">
            <el-tooltip content="登录" placement="bottom">
              <el-button type="success" icon="icon-tsy-xiugaimima" circle @click="submitForm('loginForm')"
                         style="float: left;margin: 0 0 30px"></el-button>
            </el-tooltip>
            <el-tooltip content="注册" placement="bottom">
              <el-button type="primary" icon="icon-tsy-new" circle style="float: left;margin-left: 30px" @click="registeredDialogVisible = true"></el-button>
            </el-tooltip>
          </el-form-item>
          <el-tooltip content="重置密码" placement="bottom">
            <el-button type="info" icon="el-icon-refresh" circle @click="resetForm()"
                       style="float: left;margin-left: 30px"></el-button>
          </el-tooltip>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="用户注册"
      :visible.sync="registeredDialogVisible"
      width="600px"
      :before-close="handleClose">
      <template v-if="registeredDialogVisible">
        <registered></registered>
      </template>
    </el-dialog>
  </div>
</template>

<script>

  import registered from '../model/Registered'

  import login from "../api/LoginAPI"
  import * as Model from "../api/system/ConfigOption.js"

  let cookies = require('browser-cookies');

  export default {
    name: "login",

    components: {
      registered
    },

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
        user: {},

        // 注册弹框
        registeredDialogVisible: false,
      }
    },

    // 组件渲染之后
    mounted() {
      let self = this;
    },

    methods: {

      async storageFun() {
        let options = localStorage.getItem("configOption")
        if (options !== undefined) {
          localStorage.removeItem("configOption");
        }
        let result = await Model.default.getConfigOptionList();
        if (result.status) {
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
          self.storageFun();
          cookies.set('userName', result.detail.userName);
          cookies.set('level', result.detail.level.toString());
          cookies.set('loginStatus', 'true');
          if (1 === result.detail.level) {
            // 跳转前端
            self.$router.push('/fontPage');
          } else {
            // 跳转后台
            self.$router.push('/laboratory/laboratory');
          }
        } else {
          self.$message({
            message: '用户名或密码错误',
            type: 'error'
          });
          this.$router.push('/');
        }
        // 关闭Loading
      },

      handleClose() {
        let self = this;
        self.registeredDialogVisible = false;
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
    margin: 80px 150px;
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
