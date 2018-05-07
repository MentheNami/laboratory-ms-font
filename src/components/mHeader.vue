<template>
  <el-row>
    <el-col :span="19">
      <div class="head-wrap"><span style="float:left;margin: 0 0 0 500px">实验室质量管理系统</span></div>
    </el-col>
    <el-col :span="5">
      <div class="head-user">
        <span>用户：{{userName}}</span>
        <!--<el-tooltip content="admin" placement="bottom" effect="light">-->
        <!--<el-button type="info" icon="el-icon-info" circle></el-button>-->
        <!--</el-tooltip>-->
        <!--<div class="updatePassword" @click="updatePassword">退出</div>-->
        <el-tooltip content="退出" placement="bottom" effect="light">
        <el-button icon="el-icon-back" circle  class="quit" @click="quit">
        </el-button>
        </el-tooltip>
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
        userName: 'admin'
      }
    },

    mounted() {
      let self = this;
      // self.userName = cookies.get('userName');
    },

    methods: {


      async quit(){
        let self = this;
        // let result = await userAPI.quit();
        if (result.status) {
          cookies.erase('userName');
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
    float: right;
    margin-right: 10px;
    line-height: 60px;
    font-size: 12px;
  }

  .quit{
    display: inline-block;
    float: right;
    margin:10px 20px 0;
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
