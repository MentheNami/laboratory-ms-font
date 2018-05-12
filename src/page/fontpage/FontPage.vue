<template>
  <el-container class="el-container">


    <!-- //头部-->
    <el-header class="el-header" style="height: 50px">

      <div style="float:right;margin: 0;padding: 0;width: 500px;height: 50px">

        <el-tooltip content="返回至后台管理系统" placement="top">
          <el-button icon="el-icon-back" circle style="float: right;margin: 5px 10px 0 0"
                     @click="backStage"></el-button>
        </el-tooltip>
        <el-tooltip content="投诉建议" placement="top">
          <el-button icon="el-icon-edit-outline" circle style="float: right;margin: 5px 10px 0 0"
                     @click="addDialogVisible=true"></el-button>
        </el-tooltip>

      </div>
      <div>

        <div>

          <el-dialog title="投诉建议" v-model="addDialogVisible" :visible.sync="addDialogVisible" width="750px"
                     :close-on-click-modal="false">
            <template v-if="addDialogVisible">
              <add-compliant :close="controlAddDialog" :getList="initData"></add-compliant>
            </template>
          </el-dialog>

        </div>
      </div>

    </el-header>


    <!--   //内容-->
    <el-main class="el-main" style="height: 500px;margin: 0;padding: 0">


      <el-tabs :tab-position="tabPosition" style="height: 200px;margin-top: 0px;text-align: center">

        <!--<el-tab-pane label="首页" >-->
        <!--<show-picture></show-picture>-->
        <!--</el-tab-pane>-->

        <el-tab-pane label="实验室预定">
          <doom-laboratory></doom-laboratory>
        </el-tab-pane>

        <el-tab-pane label="我的投诉">
          <my-complaint></my-complaint>
        </el-tab-pane>

        <el-tab-pane label="智能设备">
          <view-device></view-device>
        </el-tab-pane>

        <el-tab-pane label="法律法规文件">
          <view-file></view-file>
        </el-tab-pane>

        <el-tab-pane label="个人信息">
          <self-info></self-info>
        </el-tab-pane>

      </el-tabs>

    </el-main>

  </el-container>
</template>

<script>


  import myComplaint from "../../model/complaint/MyComplaint";
  import viewDevice from "../../model/device/ViewDevice";
  import viewFile from "../../model/document/ViewFile";
  import selfInfo from "../../model/info/SelfInfo";
  import doomLaboratory from "../../model/laboratory/DoomLaboratory"
  import addCompliant from "../../model/complaint/AddComplaint"
  import compalintAPI from "../../api/complaint/ComplaintAPI"
  export default {
    components: {myComplaint, viewDevice, viewFile, selfInfo, doomLaboratory,addCompliant},
    name: "font-page",
    data() {
      return {

        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        tabPosition: 'top',
        id: 0,
        total: 0,
        tableData: [],
        // 等待图标
        loading: false,
        // 新增界面弹出层
        addDialogVisible: false,
        editDialogVisible: false,
        detailDialogVisible: false,
        viewDialogVisible: false
      }

    },
    mounted() {
      let self = this;
      // 初始化数据
      self.initData();
    },

    methods: {
      async initData() {
        //   let self = this;
        //   self.loading = true;
        //   //后台获取数据
        //   let result = await suggestAPI.getProductList(self.searchForm);
        //   if (!result.status) {
        //     return self.$message({
        //       message: result.reason,
        //       type: 'warning'
        //     });
        //   }
        //   //对数据进行赋值
        //   self.tableData = result.records;
        //   self.total = result.total;
        //   // 关闭等待
        //   self.loading = false;
      },

      //删除
      async deleteById(id) {
        // let self = this;
        // let isDelete = false;
        // await this.$confirm('确定要删除吗？', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   // 用户确认删除
        //   isDelete = true;
        // }).catch(() => {
        //   // 用户取消删除
        //   self.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });
        // });
        //
        // if (isDelete) {
        //   let result = await suggestAPI.removeById({id: id});
        //   if (result.status === false) {
        //     return self.$message({
        //       message: result.reason,
        //       type: 'warning'
        //     });
        //   } else {
        //     self.$message({
        //       message: result.reason,
        //       type: 'success'
        //     });
        //     self.deleteDialogVisible = false;
        //     self.initData();
        //   }
        // }
      },


      handleSelectionChange(val) {
        let self = this;
        self.multipleSelection = val;
      },


      handleSizeChange(rows) {
        let self = this;
        self.searchForm.rows = rows;
        self.initData();
      },
      handleCurrentChange(page) {
        let self = this;
        self.searchForm.page = page;
        this.initData();
      },
      // 控制新增弹出框
      controlAddDialog() {
        let self = this;
        self.addDialogVisible = !self.addDialogVisible;
      },
      // 控制修改弹出框
      controlEditDialog(id) {
        let self = this;
        self.id = id;
        self.editDialogVisible = !self.editDialogVisible;
      },
      // 控制详情弹出框
      controlDetailDialog(id) {
        let self = this;
        self.id = id;
        self.viewDialogVisible = !self.viewDialogVisible;
      },

      backStage() {
        let self = this;
        self.$router.push('laboratory/laboratory');
      }


    },

  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    padding: 0;
    margin: 0;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  body > .el-container {
    margin-bottom: 40px;
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
    width: 80%;
    height: 80%;
    margin: 0 auto;
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

</style>

