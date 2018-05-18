<template>
  <div class="add-dialog">
    <el-form ref="configOptionForm" :model="configOptionForm" :rules="rules" label-
             width="100px" :inline="true">
      <!--<div class="module">-->
        <!--<el-form-item label="配置组">-->
          <!--<customize-option :customizeOption="configGroups" v-model="configOptionForm.groupId"></customize-option>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="选项值" prop="optionValue">-->
          <!--<el-input size="medium" class="add-form_item"-->
                    <!--v-model="configOptionForm.optionValue"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="是否为系统标识">-->
          <!--<el-switch-->
            <!--v-model="isSystem"-->
            <!--active-color="#13ce66"-->
            <!--inactive-color="#ff4949">-->
          <!--</el-switch>-->
        <!--</el-form-item>-->
      <!--</div>-->
      <!--<div class="module">-->
        <!--<el-form-item label="优先级">-->
          <!--<el-input-number v-model="configOptionForm.priority" :min="1" :max="10" label="-->
<!--描述文字"></el-input-number>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="选项名称" prop="optionName">-->
          <!--<el-input size="medium" class="add-form_item"-->
                    <!--v-model="configOptionForm.optionName"></el-input>-->
        <!--</el-form-item>-->
      <!--</div>-->
      <el-form-item label="选项名称" prop="optionName">
        <el-input size="medium" class="add-form_item"
                  v-model="configOptionForm.optionName"></el-input>
      </el-form-item>
      <el-form-item label="选项值" prop="optionValue">
          <el-input size="medium" class="add-form_item"
                    v-model="configOptionForm.optionValue"></el-input>
        </el-form-item>
    </el-form>
    <div class="save_forms_footer">
      <el-button type="success" icon="el-icon-plus" size="medium" @click="submitForm
('configOptionForm')">修改</el-button>
      <el-button type="warning" icon="el-icon-close" size="medium" @click="cancelSubmit">
        取消</el-button>
    </div>
  </div>
</template>

<script>

  import * as Model from "../../../api/system/ConfigOption.js"

  import configOptionAPI from '../../../api/system/ConfigOption'

  import configGroupAPI from '../../../api/system/ConfigGroup'

  import customizeOption from '../../../components/SelectCustomizeOption'

  export default {
    name: "edit-config-option",
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

        // 会议室对象组成
        configOptionForm: {},

        isSystem: false,

        configGroups: [],

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
      self.selectById();
      self.getConfigGroupList();
    },

    methods: {

      async getConfigGroupList() {
        let self = this;
        let result = await configGroupAPI.getConfigGroupList({page:1, rows:1000});
        if (result.status) {
          for (let configGroup of result.records) {
            let tempOption = {
              value: configGroup.id,
              label: configGroup.groupName
            };
            self.configGroups.push(tempOption);
          }
        } else {
          // 操作失败
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
      },

      async selectById() {
        let self = this;
        let result = await configOptionAPI.selectById({id: self.id});
        if (!result.status) {
          self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        self.configOptionForm = result.detail;
        self.isSystem = self.configOptionForm.system === 1;
      },

      async submitForm(roomForm) {
        let self = this;
        self.$refs[roomForm].validate((valid) => {
          if (valid) {
          } else {
            return false;
          }
        });

        let tempConfigOptionForm = {
          id: self.configOptionForm.id,
          optionName: self.configOptionForm.optionName,
          optionValue: self.configOptionForm.optionValue
        };

        let result = await configOptionAPI.updateOptionDetail(tempConfigOptionForm);
        if (result.status) {
          self.$message({
            message: '修改成功',
            type: 'success'
          });
        } else {
          // 操作失败
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        // 操作成功之后
        self.storageFun();
        self.close();
        self.getList();
      },
      // 取消修改
      cancelSubmit() {
        let self = this;
        self.close();
      },
    },
    components: {
      customizeOption
    }
  }
</script>

<style scoped>
  .add-dialog {
    width: 100%;
  }

  .module {
    width: 50%;
    float: left;
  }
</style>
