<template>
  <div class="list-main">
    <div class="list-search-box" >
      <div class="list-search-box-content" >
        <div class="list-search-box-detail">
          <div>
            <span style="float: left;margin:8px 0 ;padding: 0">投诉：</span>
            <el-input class="input-text" size="medium" style="width: 80px;padding: 0;margin: 0"
                      v-model="searchForm.contactName"></el-input>
          </div>
        </div>
        <div class="list-search-box-detail" >
          <div>
            <span style="float: left;margin: 8px 0 0 10px">处理状态：</span>
            <el-select v-model="complainantStatus" clearable placeholder="请选择" style="width: 100px">
              <el-option
                v-for="item in options"
                :key="item.complainantStatus"
                :label="item.label"
                :value="item.complainantStatus">
              </el-option>
            </el-select>
          </div>
        </div>
        <div style="float: left;margin:2px 0 0 20px" >
          <el-button type="primary" size="medium" icon="el-icon-search" @click="initData" round >搜索</el-button>
        </div>
      </div>

    </div>

    <div class="list-table-content">

      <div class="list-table-data">
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
            prop="complaintNo"
            header-align="center"
            width="250px">
          </el-table-column>

          <el-table-column
            label="投诉人姓名"
            prop="contactName"
            header-align="center"
            width="200px">
          </el-table-column>

          <el-table-column
            label="处理状态"
            prop="complainantStatus"
            header-align="center"
            width="150x">
          </el-table-column>
          <el-table-column
            label="投诉内容"
            prop="complaintDetail"
            header-align="center">
          </el-table-column>

        </el-table>
      </div>
      <div class="list-table-page">
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

  </div>
</template>

<script>

  import complaintAPI from "../../api/complaint/ComplaintAPI"

  export default {
    name: "complaint-view",
    data() {
      return {
        searchForm: {
          page: 1,
          rows: 10,
          complainantStatus: '',
          contactName: ''
        },
        id: 0,
        total: 0,
        tableData: [],
        loading: false,
        // 新增界面弹出层
        addDialogVisible: false,
        editDialogVisible: false,
        detailDialogVisible: false,
        options: [{
          complainantStatus: '1',
          label: '已处理'
        }, {
          complainantStatus: '0',
          label: '未处理'
        },],
        complainantStatus: '',
      }
    },

    mounted() {
      let self = this;
      self.initData();
    },

    methods: {
      async initData() {
        let self = this;

        self.loading = true;
        //后台获取数据
        let result = await complaintAPI.getComplaintList(self.searchForm);
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
      // 控制新增弹出框
      controlAddDialog() {
        let self = this;
        self.addDialogVisible = !this.addDialogVisible;
      },
      // 控制修改弹出框
      controlEditDialog(id) {
        let self = this;
        self.id = id;
        self.editDialogVisible = !this.editDialogVisible;
      },
      // 控制详情弹出框
      controlDetailDialog(id) {
        let self = this;
        self.id = id;
        self.detailDialogVisible = !this.detailDialogVisible;
      }
    },
    filters: {},
    components: {
    }
  }
</script>

<style scoped>

</style>
