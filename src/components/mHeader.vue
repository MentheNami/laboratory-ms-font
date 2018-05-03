<template>
  <el-row>
    <el-col :span="19">
      <div class="head-wrap"><span>实验室质量管理系统</span></div>
    </el-col>
    <el-col :span="5">
      <div class="head-user">
        <span>用户：{{loginName}}</span>
        <!--<div class="updatePassword" @click="updatePassword">退出</div>-->
        <span class="quit" @click="quit">退出</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>

  // import userAPI from '../api/manage/user/User'
  let cookies = require('browser-cookies');

  export default {

    data() {
      return {
        loginName: 'admin'
      }
    },

    mounted() {
      let self = this;
      // self.loginName = cookies.get('loginName');
    },

    methods: {


      async quit(){
        let self = this;
        // let result = await userAPI.quit();
        if (result.status) {
          cookies.erase('loginName');
          cookies.erase('loginStatus');
          self.$message({
            message: result.reason,
            type: 'success'
          });
        }
        this.$router.push('/');
      },

      // async updatePassword() {
      //
      // }
    }

  }
</script>

<style scoped>
  .head-wrap span{
    font-size: 26px;
    margin-top: 20px;
    line-height: 60px;
  }

  .head-user{
    line-height: 60px;
    font-size: 12px;
  }

  .quit{
    display: inline-block;
    width: 30px;
    height: 20px;
    margin-left: 8px;
    cursor: pointer;
  }

  .updatePassword {
    display: inline-block;
    width: 30px;
    height: 20px;
    margin-top: 20px;
    font-size: 15px;
    color: #fff;
    cursor: pointer
  }
</style>
