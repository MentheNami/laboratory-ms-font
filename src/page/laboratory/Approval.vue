<template>
  <div class="list-main">
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
            width="50"
            header-align="center">
          </el-table-column>
          <el-table-column
            label="实验室"
            prop="laboratoryName"
            width="210"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="申请人"
            prop="userName"
            header-align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="开始"
            prop="startTime"
            header-align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            label="结束"
            prop="endTime"
            header-align="center"
            width="180">
          </el-table-column>

          <el-table-column
            label="审批状态"
            header-align="center"
            width="100"
            style="font-style: italic;">
            <template slot-scope="scope">
              <span
                :style="scope.row.scheduleStatus === '未审批'? 'color:red' : ''"><b>{{scope.row.scheduleStatus}}</b></span>
            </template>
          </el-table-column>

          <el-table-column
            label="审批人"
            prop="checkUser"
            header-align="center"
            width="150">
          </el-table-column>

          <el-table-column
            label="操作"
            header-align="center">
            <template slot-scope="scope" v-if="scope.row.scheduleStatus === '未审批'">
              <el-tooltip content="同意" placement="top" effect="light">
                <el-button type="primary" icon="icon-tsy-chenggongbiaoqing" circle
                           @click="acceptSchedule(scope.row.id, true)"></el-button>
              </el-tooltip>
              <el-tooltip content="驳回" placement="top" effect="light">
                <el-button type="info" icon="icon-tsy-shenhebohui" circle
                           @click="acceptSchedule(scope.row.id, false)"></el-button>
              </el-tooltip>
            </template>
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
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

  import laboratoryScheduleAPI from '../../api/laboratory/LaboratoryScheduleAPI'

  // 用于实验室审批
  export default {
    name: "approval",
    data() {
      return {
        searchForm: {
          page: 1,
          rows: 10,
          userName: '',
          laboratoryId: ''
        },
        id: 0,
        total: 0,
        tableData: [],
        loading: false,

        acceptForm: {
          id: '',
          isAccept: '',
        }

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
        let result = await laboratoryScheduleAPI.getList(self.searchForm);
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

      async acceptSchedule(id, isAccept) {
        let self = this;
        let isOperation = false;
        let status = isAccept? '同意' : '驳回';
        let info = '此操作将' + status + '申请, 是否继续?';
        await self.$confirm(info, '提示', {
          confirmButtonText: status,
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 用户确认删除
          isOperation = true;
        }).catch(() => {
          // 用户取消删除
          this.$message({
            type: 'info',
            message: '已取消申请'
          });
        });
        if (isOperation) {
          let result = await laboratoryScheduleAPI.acceptById({id: id, isAccept: isAccept});
          if (!result.status) {
            return self.$message({
              message: result.reason,
              type: 'warning'
            });
          } else {
            self.$message({
              message: result.reason,
              type: 'success'
            });
            self.initData();
          }
        }
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

</style>
