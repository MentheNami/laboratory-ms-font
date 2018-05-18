<template>
  <div class="list-main">
    <div class="list-table-content">
      <div class="list-table-data">
        <el-table
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
            label="投诉日期"
            prop="gmtCreate"
            header-align="center"
            width="200px">
          </el-table-column>
          <el-table-column
            label="标题"
            prop="complaintTitle"
            header-align="center">
          </el-table-column>
          <el-table-column
            label="内容"
            prop="complaintDetail"
            header-align="center">
          </el-table-column>
          <el-table-column
            label="处理状态"
            prop="complainantStatus"
            header-align="center"
            width="150x">
          </el-table-column>
          <!--<el-table-column-->
            <!--label="操作"-->
            <!--header-align="center">-->
            <!--<template slot-scope="scope" >-->
              <!--<el-tooltip content="处理" placement="top" effect="light">-->
                <!--<el-button type="success" icon="el-icon-edit-outline" circle-->
                           <!--@click="controlAcceptDialog(scope.row.id)"></el-button>-->
              <!--</el-tooltip>-->
            <!--</template>-->
          <!--</el-table-column>-->
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

  import complaintAPI from '../../api/complaint/ComplaintAPI'

  export default {
    name: "my-complaint",
    comments: {},

    data() {
      return {
        // 搜索条件
        searchForm: {
          page: 1,
          rows: 10,
        },
        // 我的投诉列表
        tableData: [],
        // 投诉总数
        total: 0,
      }
    },

    // 组件渲染之后
    mounted() {
      let self = this;
      self.initData();
    },

    methods: {
      async initData() {
        let self = this;

        self.loading = true;
        //后台获取数据
        let result = await complaintAPI.getMyComplaintList();
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
    },

  }
</script>

<style scoped>

</style>
