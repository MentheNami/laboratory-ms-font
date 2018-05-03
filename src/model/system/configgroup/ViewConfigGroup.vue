<template>
  <div class="list-main">
    <div class="list-table-content">
      <div class="list-table-data">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            label="选项名称"
            width="150px"
            prop="optionName">
          </el-table-column>
          <el-table-column
            label="选项值"
            width="150px"
            prop="optionValue">
          </el-table-column>
          <el-table-column
            label="系统配置"
            width="100px"
            prop="system">
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="180px"
            prop="gmtCreate">
          </el-table-column>
          <el-table-column
            label="优先级"
            width="80px"
            prop="priority">
          </el-table-column>
          <el-table-column
            label="使用数量"
            width="80px"
            prop="useCount">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="controlEditDialog(scope.row.id)">修改</el-button>
              <el-button type="text" @click="deleteById(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--行内表单域-->
        <el-form :inline="true" :model="configOptionForm" class="inline-from">
          <span class="form_span_number">{{total}}</span>
          <!--选项名称-->
          <el-input size="medium" class="form_input_name"
                    v-model="configOptionForm.optionName"></el-input>
          <!--选项值-->
          <el-input size="medium" class="form_input_value"
                    v-model="configOptionForm.optionValue"></el-input>
          <!--系统配置-->
          <div class="form_input_system">
            否
            <el-switch
              v-model="isSystem"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            是
          </div>
          <!--创建时间-->
          <span class="form_input_time">系统默认</span>
          <!--优先级-->
          <el-input-number class="form_input_priority" v-model="configOptionForm.priority" :min="1" :max="10" :controls="false"></el-input-number>
          <!--使用数量-->
          <span class="form_input_count">系统默认</span>
          <el-button type="text" @click="submitForm()">添加</el-button>
        </el-form>
        <div class="hr-table"></div>
      </div>
    </div>
    <div>
      <el-dialog title="修改选项配置信息" v-model="editDialogVisible" :visible.sync="editDialogVisible" width="710px"
                 :close-on-click-modal="false" :append-to-body="true">
        <template v-if="editDialogVisible">
          <edit-config-option :close="controlEditDialog" :getList="initData" :id="optionId"></edit-config-option>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  // device API
  import configOptionAPI from '../../../api/system/ConfigOption'
  // 修改页面
  import editConfigOption from '../configoption/EditConfigOption'

  import configGroupAPI from '../../../api/system/ConfigGroup'

  import customizeOption from '../../../components/SelectCustomizeOption'

  export default {
    name: "view-config-group",
    props: {
      close: {
        type: Function,
        required: false
      },
      getList: {
        type: Function,
        required: false
      },
      id: {
        type: Number,
        required: true
      },
    },
    data() {
      return {
        // 配置选项组成
        configOptionForm: {
          optionName: '',
          optionValue: '',
          priority: '',
          system: 0,
          groupId: '',
        },

        isSystem: false,
        optionId: '',
        today: '',
        total: '',
        tableData: [],
        // 新增界面弹出层
        addDialogVisible: false,
        editDialogVisible: false,

        rules: {
          optionName: [
            {required: true, message: '请输入选项名称', trigger: 'blur'}
          ],
          optionValue: [
            {required: true, message: '请输入选项值', trigger: 'blur'}
          ],
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
        let result = await configOptionAPI.selectByGroupId({groupId: self.id});
        if (!result.status) {
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        //对数据进行赋值
        self.tableData = result.records;
        self.total = result.records.length + 1;
        self.configOptionForm.groupId = self.id;
        self.loading = false;
      },

      async submitForm() {
        let self = this;
        let errorMessage = '';
        if ('' === self.configOptionForm.optionName) {
          errorMessage = errorMessage + ' 选项名称 '
        }
        if ('' === self.configOptionForm.optionValue) {
          errorMessage = errorMessage + ' 选项值 '
        }
        if ('' !== errorMessage) {
          self.$message({
            message: errorMessage + ' 不能为空',
            type: 'warning'
          });
        } else {
          // 校验通过
          // 转换系统标识
          self.configOptionForm.system = self.isSystem === true? 1 : 0;

          let result = await configOptionAPI.addOptionDetail(self.configOptionForm);
          if (result.status) {
            self.$message({
              message: '操作成功',
              type: 'success'
            });
          } else {
            // 操作失败
            return self.$message({
              message: result.reason,
              type: 'warning'
            });
          }
          // 情况数据
          self.configOptionForm = {
            optionName: '',
            optionValue: '',
            priority: '',
            system: 0,
            groupId: '',
          }
          // 操作成功之后
          self.initData();
        }
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
          return this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

        if (isDelete) {
          let result = await configOptionAPI.deleteOptionDetail({id: id});
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

      // 控制修改弹出框
      controlEditDialog(id) {
        let self = this;
        self.optionId = id;
        self.editDialogVisible = !this.editDialogVisible;
      },

      // 控制详情弹出框
      controlDetailDialog(id) {
        let self = this;
        self.id = id;
        self.detailDialogVisible = !this.detailDialogVisible;
      }
    },
    components: {
      editConfigOption, customizeOption
    }
  }
</script>

<style scoped>
  .list-main {
    height: 800px;
  }

  .add-form_item {
    width: 90px;
    height: 65px;
  }

  .inline-from {
    line-height: 65px;
    border-bottom: 1px solid #ebeef5;
  }

  .hr-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px
  }

  /*from begin*/

  .form_span_number {
    display: inline-block;
    width: 30px;
    padding: 0 10px;
  }

  .form_input_name {
    width: 130px;
    padding-right: 20px;
  }

  .form_input_value {
    width: 130px;
    padding-right: 20px;
  }

  .form_input_system {
    display: inline-block;
    width: 80px;
    padding-right: 20px;
  }

  .form_input_time {
    display: inline-block;
    width: 140px;
    padding-right: 20px;
  }

  .form_input_priority {
    display: inline-block;
    width: 60px;
    padding-right: 20px;
  }

  .form_input_count {
    display: inline-block;
    width: 60px;
    padding-right: 20px;
  }

  /*from end*/
</style>
