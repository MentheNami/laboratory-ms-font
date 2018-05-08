<template>
  <el-row>
    <el-col :span="1">
      <el-button icon="el-icon-menu" circle class="fontPage" @click="goFontPage">
      </el-button>
    </el-col>
    <el-col :span="18">
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
          <el-button icon="el-icon-back" circle class="quit" @click="quit">
          </el-button>
        </el-tooltip>
      </div>
    </el-col>
  </el-row>
</template>

<script>

  import loginAPI from '../api/LoginAPI'

  let cookies = require('browser-cookies');

  export default {

    data() {
      return {
        userName: 'admin'
      }
    },

    mounted() {
      let self = this;
      self.userName = cookies.get('userName');
    },

    methods: {


      // 退出
      async quit() {
        let self = this;
        let isQuit = true;
        await self.$confirm('温馨提示：是否确认退出实验室质量管理系统？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 用户确认退出
          isQuit = true;
        }).catch(() => {
          // 用户取消退出
          isQuit = false;
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
        if (isQuit) {
          let result = await loginAPI.quit();
          if (result.status) {
            cookies.erase('userName');
            cookies.erase('loginStatus');
          }
          self.$router.push('/');
        }
      },

      goFontPage() {
        let self = this;
        self.$router.push('/fontPage');
      }

    }

  }
</script>

<style scoped>
  .head-wrap span {
    font-size: 26px;
    margin-top: 20px;
    line-height: 60px;
  }

  .head-user {
    float: right;
    margin-right: 10px;
    line-height: 60px;
    font-size: 12px;
  }

  .quit {
    display: inline-block;
    float: right;
    margin: 10px 20px 0;
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
