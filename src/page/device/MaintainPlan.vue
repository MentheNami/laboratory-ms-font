<template>
  <div class="list-main">
    <div class="list-search-box">
      <div class="list-search-box-content">
        <div class="list-search-box-detail">
          <div>
            <span style="float: left;margin:8px 0 ;padding: 0">方案编号：</span>
            <el-input class="input-text" size="medium" style="width: 80px;padding: 0;margin: 0"
                      v-model="searchForm.applyNo"></el-input>
          </div>
        </div>
        <div class="list-search-box-detail">
          <div>
            <span style="float: left;margin: 8px 0 0 10px">方案申请人：</span>
            <el-input class="input-text" size="medium" style="width: 80px;padding: 0;margin: 0"
                      v-model="searchForm.applyUser"></el-input>
          </div>
        </div>
        <div style="float: left;margin:2px 0 0 10px">
          <el-button type="primary" size="medium" icon="icon-tsy-sousuo3" @click="initData" round>搜索</el-button>
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
            width="50"
            header-align="center">
          </el-table-column>
          <el-table-column
            label="方案编号"
            prop="applyNo"
            width="250"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="申请人"
            prop="applyUser"
            header-align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="设备名称"
            prop="deviceName"
            header-align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column
            label="方案类型"
            prop="programType"
            header-align="center"
            width="120">
          </el-table-column>

          <el-table-column
            label="执行时间"
            prop="executionDate"
            header-align="center"
            width="150">
          </el-table-column>

          <el-table-column
            label="是否审批"
            header-align="center"
            width="100"
          style="font-style: italic;">
            <template slot-scope="scope">
              <span :style="scope.row.isApproval === '未审批'? 'color:red' : ''"><b>{{scope.row.isApproval}}</b></span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            header-align="center">

            <template slot-scope="scope">
              <el-tooltip content="审批方案" placement="top" effect="light">
                <el-button type="primary" icon="icon-tsy-tianjia1" circle v-if="scope.row.isApproval !== '已审批'"
                           @click="controlAcceptDialog(scope.row.id)"></el-button>
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
    <div>
      <el-dialog title="设备方案审批" v-model="acceptDialogVisible" :visible.sync="acceptDialogVisible" width="450px"
                 :close-on-click-modal="false">
        <template v-if="acceptDialogVisible">
          <accept-device-plan :close="controlAcceptDialog" :getList="initData" :id="id"></accept-device-plan>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  // 设备保养计划
  import acceptDevicePlan from '../../model/device/AcceptDevicePlan'

  import selectConfigOption from '../../components/SelectConfigOption'

  import devicePlanAPI from '../../api/device/DevicePlanAPI'

  export default {
    name: "maintain-plan",
    components: {
      acceptDevicePlan, selectConfigOption
    },

    data() {
      return {
        searchForm: {
          page: 1,
          rows: 10,
          applyNo: '',
          applyUser: ''
        },
        id: 0,
        total: 0,
        tableData: [],
        loading: false,
        // 新增界面弹出层
        acceptDialogVisible: false,
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
        let result = await devicePlanAPI.getDeviceProgramList(self.searchForm);
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
      // 控制审批弹出框
      controlAcceptDialog(id) {
        let self = this;
        self.id = id;
        self.acceptDialogVisible = !this.acceptDialogVisible;
      },
    }
  }
</script>

<style scoped>

</style>
