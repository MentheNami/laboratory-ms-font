<template>
  <div class="list-main">
    <div class="list-search-box" style="padding: 20px">
      <div class="list-search-box-detail" :span="8">
        <div><span style="margin-left: 10px;color: #636363;font-family: 黑体">规则类型：</span>
          <select-option name="numberType" v-model="searchForm.ruleType"></select-option>
        </div>
      </div>
      <div class="list-search-box-detail" :span="8">

        <div><span style="margin-left: 10px;color: #636363;font-family: 黑体">编号规则：</span>
          <el-input class="input-text" size="medium" style="width: 160px"
                    v-model="searchForm.prefixNumber"></el-input>
        </div>
      </div>
      <div class="list-table-button" style="float:left;margin:0px 15px">
        <el-button type="primary" size="medium" icon="el-icon-search" @click="initData" round>搜索</el-button>
      </div>
    </div>
    <div class="list-table-content">
      <div class="list-table-data">
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;"
          height="450px"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
          >
          </el-table-column>
          <el-table-column
            label="规则类型"
            prop="ruleType"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="编号规则"
            prop="prefixNumber"
            header-align="center">
          </el-table-column>
          <el-table-column
            label="下一个编号"
            prop="nextNumber"
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
                <el-button type="primary" icon="el-icon-more-outline" circle
                           @click="controlViewDialog(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="修改" placement="top" effect="light">
                <el-button type="info" icon="el-icon-edit-outline" circle
                           @click="controlEditDialog(scope.row.id)"></el-button>
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
      <el-dialog title="修改编号规则信息" v-model="editDialogVisible" :visible.sync="editDialogVisible" width="490px"
                 :close-on-click-modal="false">
        <template v-if="editDialogVisible">
          <edit-number :close="controlEditDialog" :getList="initData" :id="id"></edit-number>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import editNumber from '../../model/system/EditNumber'

  import selectOption from '../../components/SelectConfigOption'

  import numberAPI from '../../api/system/Number'

  export default {
    name: "number",
    components: {
      editNumber, selectOption
    },
    data() {
      return {
        searchForm: {
          page: 1,
          rows: 10,
          ruleType: '',
          prefixNumber: '',
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

      async initData() {
        let self = this;
        //后台获取数据
        let result = await numberAPI.getNumberRule(self.searchForm);
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
    }
  }
</script>

<style scoped>

</style>
