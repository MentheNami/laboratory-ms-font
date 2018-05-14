<template>

  <div>
    <!--搜索栏-->
    <div class="mysearchlinebox">
      <div class="list-search-box-content">
        <div class="list-search-box-detail">
          <div>
            <span style="float: left;margin:8px 0 ;padding: 0">姓名：</span>
            <el-input class="input-text" size="medium" style="width: 80px;padding: 0;margin: 0"
                      v-model="searchForm.realName"></el-input>
          </div>
        </div>
        <div class="list-search-box-detail">
          <div>
            <span style="float: left;margin: 8px 0 0 10px">手机：</span>
            <el-input class="input-text" size="medium" style="width: 80px;padding: 0;margin: 0"
                      v-model="searchForm.cellPhone"></el-input>
          </div>
        </div>
        <div class="list-search-box-detail">
          <div>
            <span style="float: left;margin: 8px 0 0 10px">邮箱：</span>
            <el-input class="input-text" size="medium" style="width: 80px;padding: 0;margin: 0"
                      v-model="searchForm.email"></el-input>
          </div>
        </div>
        <div style="float: left;margin:2px 0 0 20px">
          <el-button type="primary" size="medium" icon="el-icon-search" @click="initData" round>搜索</el-button>
        </div>
      </div>
    </div>

    <!--信息列表-->
    <div class="myliststyle">

      <el-table
        v-loading="loading"
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="83"
          header-align="center">
        </el-table-column>

        <el-table-column
          label="真实姓名"
          prop="realName"
          header-align="center"
          width="150px">
        </el-table-column>

        <el-table-column
          label="手机"
          prop="cellPhone"
          header-align="center"
          width="200px">
        </el-table-column>

        <el-table-column
          label="邮箱"
          prop="email"
          header-align="center"
          width="300x">
        </el-table-column>

        <el-table-column
          label="注册时间"
          prop="gmtCreate"
          header-align="center">
        </el-table-column>

        <el-table-column label="操作" header-align="center">
          <template slot-scope="scope">
            <el-tooltip content="重置密码" placement="top">
              <el-button type="primary" icon="el-icon-setting" circle @click="resetPasswordById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="myupdownpages" >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchForm.rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>


  </div>
</template>

<script>
  import UserInfoAPI from "../../api/user/UserInfoAPI"
    export default {
        name: "user",
      data(){
          return{
            searchForm:{
              page:1,
              rows:10,
              realName:'',
              cellPhone:'',
              email:'',
              roleId:40
            },
            id:'',
            total:0,
            tableData: [],
            loading: false,
          }

      },
      mounted(){
        let self = this;
        self.initData();
      },

      methods:{
        async initData() {
          let self = this;

          self.loading = true;
          //后台获取数据
          let result = await UserInfoAPI.getUserInfo(self.searchForm);
          if (!result.status) {
            return self.$message({
              message: result.reason,
              type: 'warning'
            });
          }
          //对数据进行赋值
          self.tableData = result.records;
          self.total = result.total;
          self.loading = false;
        },
        handleSelectionChange(val) {
          let self = this;
          self.multipleSelection = val;
        },
        handleSizeChange(rows) {
          let self = this;
          self.searchForm.rows = rows;
          this.initData();
        },
        handleCurrentChange(page) {
          let self = this;
          self.searchForm.page = page;
          this.initData();
        },

      }

    }
</script>

<style scoped>
  .mysearchlinebox{
    width: 1000px;
    height: 40px;
    background: #fff;
    float: left;
    margin-top:10px;
  }
  .myliststyle{
    max-height: 450px;
    overflow: auto;
    width: 100%;
    background: #fff;
    float: left;
    margin: 0;
  }
  .myupdownpages{
    float: left;
    margin: 10px 300px;
  }
</style>
