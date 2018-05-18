<template>
  <div class="list-main">
    <div class="list-search-box" style="padding: 20px">
      <div class="list-search-box-detail" :span="8">
        <div><span style="margin-left: 10px;color: #636363;font-family: 黑体">配置组键：</span><el-input class="input-text" size="medium" style="width: 160px"
                       v-model="searchForm.groupKey"></el-input></div>
      </div>
      <div class="list-search-box-detail" :span="8">

        <div> <span style="margin-left: 10px;color: #636363;font-family: 黑体">配置组名字：</span><el-input class="input-text" size="medium" style="width: 160px"
                       v-model="searchForm.groupName"></el-input></div>
      </div>
      <div class="list-table-button" style="float:left;margin:0px 15px">
      <el-button type="primary" size="medium" icon="icon-tsy-sousuo3" @click="initData" round>搜索</el-button>
    </div>
      <div class="list-table-button" style="float: right">
        <el-button type="primary" icon="icon-tsy-new" size="medium" @click="addDialogVisible = true" round>新增
        </el-button>
      </div>
    </div>
    <div class="list-table-content">

      <div class="list-table-data"  >
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;"
         >
          <el-table-column
            label="序号"
            type="index"
            width="50"
          >
          </el-table-column >
          <el-table-column
            label="配置组键"
            prop="groupKey"
          header-align="center"
         >
          </el-table-column>
          <el-table-column
            label="配置组名字"
            prop="groupName"
            header-align="center">
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="gmtCreate"
            header-align="center">
          </el-table-column>
          <el-table-column label="操作" header-align="center">
            <template slot-scope="scope">
              <el-tooltip content="查看详情" placement="top" effect="light">
              <el-button type="primary" icon="icon-tsy-xiugaitouxiang" circle @click="controlViewDialog(scope.row.id)"></el-button></el-tooltip>

              <el-tooltip content="修改" placement="top" effect="light">
              <el-button type="info" icon="icon-tsy-xiugai-copy" circle @click="controlEditDialog(scope.row.id)"></el-button>
              </el-tooltip>

              <el-tooltip content="删除" placement="top" effect="light">
              <el-button type="danger" icon="icon-tsy-shanchu1" circle @click="deleteById(scope.row.id)"></el-button>
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
      <el-dialog title="查看配置组" v-model="viewDialogVisible" :visible.sync="viewDialogVisible" width="1000px"
                 :close-on-click-modal="false">
        <template v-if="viewDialogVisible">
          <view-config-group :close="controlViewDialog" :getList="initData" :id="id"></view-config-group>
        </template>
      </el-dialog>
      <el-dialog title="新增配置组" v-model="addDialogVisible" :visible.sync="addDialogVisible" width="490px"
                 :close-on-click-modal="false">
        <template v-if="addDialogVisible">
          <add-config-group :close="controlAddDialog" :getList="initData"></add-config-group>
        </template>
      </el-dialog>
      <el-dialog title="修改配置组信息" v-model="editDialogVisible" :visible.sync="editDialogVisible" width="490px"
                 :close-on-click-modal="false">
        <template v-if="editDialogVisible">
          <edit-config-group :close="controlEditDialog" :getList="initData" :id="id"></edit-config-group>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import * as Model from "../../api/system/ConfigOption.js"
  // 新增页面
  import addConfigGroup from '../../model/system/configgroup/AddConfigGroup';
  // 修改页面
  import editConfigGroup from '../../model/system/configgroup/EditConfigGroup';
  // 查看界面
  import viewConfigGroup from '../../model/system/configgroup/ViewConfigGroup';

  import configGroupAPI from '../../api/system/ConfigGroup'

  export default {
    name: "config-group",
    data() {
      return {
        searchForm: {
          page: 1,
          rows: 10,
          groupKey: '',
          groupName: '',
        },
        id: 0,
        total: 0,
        tableData: [],
        configGroups: [],
        // 新增界面弹出层
        addDialogVisible: false,
        editDialogVisible: false,
        viewDialogVisible: false
      }
    },
    mounted() {
      let self = this;
      self.initData();
    },

    methods: {

      async storageFun() {
        let options = localStorage.getItem("configOption")
        if(options !== undefined) {
          localStorage.removeItem("configOption");
        }
        let result  = await Model.default.getConfigOptionList();
        if(result.status) {
          localStorage.setItem("configOption", JSON.stringify(result.records))
        }
      },

      async initData() {
        let self = this;
        //后台获取数据
        let result = await configGroupAPI.getConfigGroupList(self.searchForm);
        console.log(result);
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

      async deleteById(id) {
        let self = this;
        let isDelete = false;
        await this.$confirm('此操作将永久删除所选用户, 是否继续?', '提示', {
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
          let result = await configGroupAPI.deleteById({id: id});
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
            self.storageFun();
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
      // 控制查看弹出框
      controlViewDialog(id) {
        let self = this;
        self.id = id;
        self.viewDialogVisible = !this.viewDialogVisible;
      }
    },

    components: {
      addConfigGroup, editConfigGroup, viewConfigGroup
    }
  }
</script>

<style scoped>

</style>
