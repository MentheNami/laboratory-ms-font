<template>
  <!--miandiv-->
   <div>
     <!--搜索栏-->
     <div class="mysearchlinebox">
       <div class="list-search-box-content">
         <div class="list-search-box-detail">
           <div>
             <span style="float: left;margin:8px 0 ;padding: 0">受理人：</span>
             <el-input class="input-text" size="medium" style="width: 80px;padding: 0;margin: 0"
                       v-model="searchForm.acceptorBy"></el-input>
           </div>
         </div>
         <div class="list-search-box-detail">
           <div>
             <span style="float: left;margin: 8px 0 0 10px">投诉处理意见：</span>
             <el-select v-model="searchForm.processingAdvice" clearable placeholder="请选择" style="width: 120px">
               <el-option
                 v-for="item in options"
                 :key="item.processingAdvice"
                 :label="item.label"
                 :value="item.processingAdvice">
               </el-option>
             </el-select>
           </div>
         </div>
         <div style="float: left;margin:2px 0 0 20px">
           <el-button type="primary" size="medium" icon="el-icon-search" @click="initData" round>搜索</el-button>
         </div>
       </div>
     </div>


    <!--列表-->
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
           label="投诉编号"
           prop="complainId"
           header-align="center"
           width="250px">
         </el-table-column>

         <el-table-column
           label="受理人"
           prop="acceptorBy"
           header-align="center"
           width="200px">
         </el-table-column>

         <el-table-column
           label="受理时间"
           prop="gmtModified"
           header-align="center"
           width="150x">
         </el-table-column>

         <el-table-column
           label="受理状态"
           prop="processingAdvice"
           header-align="center">
         </el-table-column>

         <el-table-column
           label="处理内容"
           prop="processingContent"
           header-align="center">
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
  // 用于用户进行投诉
  import compliantAcceptAPI from "../../api/complaint/ComplaintAcceptAPI"

    export default {
        name: "complaint",
      data() {
        return {
          searchForm: {
            page: 1,
            rows: 10,
            acceptorBy: '',
            processingAdvice: '',
          },
          id: '',
          total: 0,
          tableData: [],
          loading: false,
          options: [{
            processingAdvice: 1,
            label: '同意'
          }, {
            processingAdvice: 0,
            label: '驳回'
          },],
          processingAdvice:'',
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
          let result = await compliantAcceptAPI.getComplaintAcceptList(self.searchForm);
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
  .list-main {
    height: 500px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
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
