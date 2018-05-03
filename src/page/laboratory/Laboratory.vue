<template>
  <div class="list-main">
    <div class="list-search-box">
      <div class="list-search-box-content">
        <div class="list-search-box-detail">
          <span>会议室名称：</span>
          <div>
            <el-input class="input-text" size="medium" style="width: 160px"
                      v-model="searchForm.laboratoryName"></el-input>
          </div>
        </div>
        <div class="list-search-box-detail">
          <span>楼层：</span>
          <div>
            <span><floor-type name="floor" v-model="searchForm.floor"></floor-type></span>
          </div>
        </div>
        <div class="list-table-button">
          <el-button type="primary" size="medium" icon="el-icon-search" @click="initData">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="list-table-content">
      <div class="list-table-button">
        <el-button type="success" icon="el-icon-plus" size="medium" @click="addDialogVisible = true">新增
        </el-button>
        <el-button type="danger" icon="el-icon-delete" size="medium" @click="deleteRoom">
          删除
        </el-button>
      </div>
      <div class="list-table-data">
        <el-table
          v-loading="loading"
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="序号"
            type="index"
            width="85">
          </el-table-column>
          <el-table-column
            label="实验室名称"
            prop="laboratoryName">
          </el-table-column>
          <el-table-column
            label="楼层"
            prop="floor">
          </el-table-column>
          <el-table-column
            label="容量（人数）"
            prop="capacity">
          </el-table-column>
          <el-table-column
            label="是否自主预定"
            prop="isAutonomy">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteById(scope.row.id)">删除</el-button>
              <el-button type="text" @click="controlEditDialog(scope.row.id)">修改</el-button>
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
    <!--<div>-->
      <!--<el-dialog title="新增会议室" v-model="addDialogVisible" :visible.sync="addDialogVisible" width="800px"-->
                 <!--:close-on-click-modal="false">-->
        <!--<template v-if="addDialogVisible">-->
          <!--<add-room :close="controlAddDialog" :getList="initData"></add-room>-->
        <!--</template>-->
      <!--</el-dialog>-->
      <!--<el-dialog title="修改会议室" v-model="editDialogVisible" :visible.sync="editDialogVisible" width="800px"-->
                 <!--:close-on-click-modal="false">-->
        <!--<template v-if="editDialogVisible">-->
          <!--<edit-room :close="controlEditDialog" :getList="initData" :id="id"></edit-room>-->
        <!--</template>-->
      <!--</el-dialog>-->
    <!--</div>-->
  </div>
</template>

<script>

  // import roomScheduleAPI from '../../api/room/RoomSchedule.vue'
  import laboratoryAPI from '../../api/laboratory/LaboratoryAPI'
  import * as Model from "../../api/system/ConfigOption.js"

  import floorType from '../../components/SelectConfigOption'

  export default {
    name: "laboratory",
    data() {
      return {
        searchForm: {
          page: 1,
          rows: 10,
          floor: '',
          laboratoryName: ''
        },
        id: 0,
        total: 0,
        tableData: [],
        loading: false,
        // 新增界面弹出层
        addDialogVisible: false,
        editDialogVisible: false,
        detailDialogVisible: false,
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
        if(options != undefined) {
          localStorage.removeItem("configOption");
        }
        let result1  = await Model.default.getConfigOptionList()
        if(result1.status) {
          localStorage.setItem("configOption", JSON.stringify(result1.records))
        }

        self.loading = true;
        //后台获取数据
        let result = await laboratoryAPI.getLaboratoryList(self.searchForm);
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
          await this.$confirm('此操作将永久删除所选会议室, 是否继续?', '提示', {
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
            let result = await laboratoryAPI.removeById({ids: ids});
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
          let result = await laboratoryAPI.removeById({ids: [id]});
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
      // 控制详情弹出框
      controlDetailDialog(id) {
        let self = this;
        self.id = id;
        self.detailDialogVisible = !this.detailDialogVisible;
      }
    },
    filters: {},
    components: {
      floorType
    }
  }
</script>

<style scoped>

</style>
