<template>
  <div style="width: 100%">
    <el-form label-position="right" :model="registeredForm" ref="registeredForm" :rules="rules" label-width="100px" :inline="true">
      <el-form-item label="用户名" prop="userName" style="margin-left: -90px;">
        <el-input v-model="registeredForm.userName" style="width: 260px"></el-input>
      </el-form-item>
      <el-form-item label="电子邮" prop="email" style="margin-left: -90px;">
        <el-input v-model="registeredForm.email" style="width: 260px;"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="cellPhone" style="margin-left: -90px;">
        <el-input v-model="registeredForm.cellPhone" style="width: 260px;"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" style="margin-left: -88px">
        <el-input v-model="registeredForm.code" style="width: 142px"></el-input>
        <el-button type="primary" @click="getCode">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword" style="margin-left: -83px">
        <el-input v-model="registeredForm.userPassword" type="password" style="width: 260px"></el-input>
      </el-form-item>
      <el-form-item style="width: 260px">
        <el-button type="primary" @click="submitForm('registeredForm')">立即注册</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import loginAPI from '../api/LoginAPI'

  export default {
    name: "registered",

    data() {
      return {

        registeredForm: {
          userName: '',
          cellPhone: '',
          code: '',
          userPassword: '',
          email: ''
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          cellPhone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
          ],
          userPassword: [
            {required: true, message: '请设置密码', trigger: 'blur'},
          ],
          email: [
            {required: true, message: '请设置电子邮箱', trigger: 'blur'},
          ],
        }
      }
    },

    methods: {
      async getCode() {
        let self = this;
        if ('' === self.registeredForm.cellPhone) {
          return self.$message({
            message: "请先输入手机号",
            type: 'warning'
          });
        }
        let result = await loginAPI.getCode({cellPhone: self.registeredForm.cellPhone});
        return self.$message({
          message: result.reason,
          type: true === result.status ? 'success' : 'warning'
        });
      },

      async submitForm(registeredForm) {
        let self = this;
        let isRegistered = true;
        self.$refs[registeredForm].validate((valid) => {
          if (valid) {
          } else {
            isRegistered = false;
            return false;
          }
        });
        // 校验通过
        if (isRegistered) {
          let result = await loginAPI.addUserAccount(self.registeredForm);
          if (result.status) {
            self.$message({
              message: '注册成功',
              type: 'success'
            });
          } else {
            // 操作失败
            return self.$message({
              message: result.reason,
              type: 'warning'
            });
          }
        }
      },

      resetForm() {
        let self = this;
        self.registeredForm.userName = '';
        self.registeredForm.userPassword = '';
        self.registeredForm.cellPhone = '';
        self.registeredForm.code = '';
      }

    }
  }
</script>

<style scoped>

</style>
