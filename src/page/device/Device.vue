<template>
  <div class="list-main">
    <div class="list-search-box">
      <div class="list-search-box-content">
        <div class="list-search-box-detail">
          <div>
            <span style="float: left;margin:8px 0 ;padding: 0">设备名称：</span>
            <el-input class="input-text" size="medium" style="width: 80px;padding: 0;margin: 0"
                      v-model="searchForm.deviceName"></el-input>
          </div>
        </div>
        <div class="list-search-box-detail">
          <div>
            <span style="float: left;margin: 8px 0 0 10px">设备类型：</span>
            <select-config-option name="deviceType" v-model="searchForm.deviceType"></select-config-option>
          </div>
        </div>
        <div style="float: left;margin:2px 0 0 10px">
          <el-button type="primary" size="medium" icon="el-icon-search" @click="initData" round>搜索</el-button>
        </div>
      </div>
      <div class="list-table-button1">
        <el-button type="success" icon="el-icon-plus" size="medium" @click="addDialogVisible = true" round>新增
        </el-button>
        <el-button type="danger" icon="el-icon-delete" size="medium" @click="deleteRoom" round>
          删除
        </el-button>
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
            label="设备编号"
            prop="deviceNo"
            width="200"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="设备名称"
            prop="deviceName"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="所属会议室"
            prop="laboratory"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="类型"
            prop="deviceType"
            header-align="center"
          width="60">
          </el-table-column>

          <el-table-column
            label="状态"
            prop="deviceStatus"
            header-align="center"
          width="60">
          </el-table-column>

          <el-table-column
            label="是否在线"
            prop="isOnline"
            header-align="center"
          width="80">
          </el-table-column>


          <el-table-column
            label="操作"
            header-align="center">

            <template slot-scope="scope">
              <el-tooltip content="修改" placement="top" effect="light">
                <el-button type="info" icon="el-icon-edit" circle
                           @click="controlEditDialog(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="申请方案" placement="top" effect="light">
                <el-button type="warning" icon="el-icon-circle-plus-outline" circle
                           @click="controlPlanDialog(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top" effect="light">
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.row.id)"></el-button>
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
      <el-dialog title="新增智能设备" v-model="addDialogVisible" :visible.sync="addDialogVisible" width="450px"
                 :close-on-click-modal="false">
        <template v-if="addDialogVisible">
          <add-device :close="controlAddDialog" :getList="initData"></add-device>
        </template>
      </el-dialog>
      <el-dialog title="申请设备方案" v-model="planDialogVisible" :visible.sync="planDialogVisible" width="680px"
                 :close-on-click-modal="false">
        <template v-if="planDialogVisible">
          <add-device-plan :close="controlPlanDialog" :getList="initData" :id="id"></add-device-plan>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  // import roomScheduleAPI from '../../api/room/RoomSchedule.vue'
  import deviceAPI from '../../api/device/DeviceAPI'
  import * as Model from "../../api/system/ConfigOption.js"

  import selectConfigOption from '../../components/SelectConfigOption'
  import addDevice from "../../model/device/AddDevice";

  import addDevicePlan from '../../model/device/AddDevicePlan'

  export default {
    name: "Device",
    components: {
      addDevice, selectConfigOption, addDevicePlan
    },

    data() {
      return {
        searchForm: {
          page: 1,
          rows: 10,
          deviceName: '',
          deviceType: ''
        },
        id: 0,
        total: 0,
        tableData: [],
        loading: false,
        // 新增界面弹出层
        addDialogVisible: false,
        editDialogVisible: false,
        // 控制设备方案
        planDialogVisible: false,
      }
    },

    mounted() {
      let self = this;
      self.initData();
    },

    methods: {
      async initData() {

        let self = this;
        let options = localStorage.getItem("configOption")
        if (options != undefined) {
          localStorage.removeItem("configOption");
        }
        let result1 = await Model.default.getConfigOptionList()
        if (result1.status) {
          localStorage.setItem("configOption", JSON.stringify(result1.records))
        }

        self.loading = true;
        //后台获取数据
        let result = await deviceAPI.getDeviceList(self.searchForm);
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

      async deleteRoom() {
        let self = this;
        let multipleSelection = self.multipleSelection;
        if (multipleSelection.length === 0) {
          // 没有勾选即将删除的会议室
          return self.$message({
            message: '请勾选需要删除的会议室',
            type: 'warning'
          });
        } else {
          // 提示用户确认
          let isDelete = false;
          await this.$confirm('此操作将永久删除所选设备, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 用户确认删除
            isDelete = true;
          }).catch(() => {
            // 用户取消删除
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

          if (isDelete) {
            // 已确认删除操作
            let multipleSelection = self.multipleSelection;
            let ids = [];
            for (let item of multipleSelection) {
              ids.push(item.id)
            }
            let result = await deviceAPI.removeById({ids: ids});
            if (result.status === false) {
              return self.$message({
                message: result.reason,
                type: 'warning'
              });
            } else {
              self.$message({
                message: result.reason,
                type: 'success'
              });
              self.deleteDialogVisible = false;
              self.initData();
            }
          }
        }
      },

      async deleteById(id) {
        let self = this;
        let isDelete = false;
        await this.$confirm('此操作将永久删除所选会议室, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 用户确认删除
          isDelete = true;
        }).catch(() => {
          // 用户取消删除
          self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

        if (isDelete) {
          let result = await deviceAPI.removeById({ids: [id]});
          if (result.status === false) {
            return self.$message({
              message: result.reason,
              type: 'warning'
            });
          } else {
            self.$message({
              message: result.reason,
              type: 'success'
            });
            self.deleteDialogVisible = false;
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
      // 控制申请方案弹出框
      controlPlanDialog(id) {
        let self = this;
        self.id = id;
        self.planDialogVisible = !this.planDialogVisible;
      }
    },

  }
</script>

<style scoped>

</style>
