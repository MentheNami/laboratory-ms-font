<template>
  <div class="add-dialog">
    <el-form ref="configGroupForm" :model="configGroupForm" :rules="rules" label-
             width="100px" :inline="true">
      <el-form-item label="配置组键" prop="groupKey">
        <el-input size="medium" class="add-form_item"
                  v-model="configGroupForm.groupKey" style="margin-left: 10px;padding: 0;width: 210px"></el-input>
      </el-form-item>
      <el-form-item label="配置组名称" prop="groupName">
        <el-input size="medium" class="add-form_item"
                  v-model="configGroupForm.groupName"></el-input>
      </el-form-item>
    </el-form>
    <div class="save_forms_footer">
      <el-button type="success" icon="icon-tsy-new" size="medium" @click="submitForm
('configGroupForm')" round>修改
      </el-button>
      <el-button type="warning" icon="icon-tsy-quxiao" size="medium" @click="cancelSubmit" round style="margin-left: 20px">
        取消
      </el-button>
    </div>
  </div>
</template>

<script>

  import * as Model from "../../../api/system/ConfigOption.js"
  import configGroupAPI from '../../../api/system/ConfigGroup'

  export default {
    name: "edit-config-group",
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

        // 配置组对象
        configGroupForm: {},

        // 校验规则
        rules: {
          groupKey: [
            {required: true, message: '请输入配置组键', trigger: 'blur'}
          ],
          groupName: [
            {required: true, message: '请输入配置组名称', trigger: 'blur'}
          ],
        }

      }
    },

    mounted() {
      let self = this;
      self.selectById();
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

      // 获取单个配置组详情
      async selectById() {
        let self = this;
        let result = await configGroupAPI.getDetailById({id: self.id});
        if (!result.status) {
          self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        self.configGroupForm = {groupKey: result.detail.key, groupName: result.detail.value};
      },

      // 修改
      async submitForm(configGroupForm) {
        let self = this;
        self.$refs[configGroupForm].validate((valid) => {
          if (valid) {
          } else {
            return false;
          }
        });

        let tempConfigGroupForm = {
          id: self.id,
          groupKey: self.configGroupForm.groupKey,
          groupName: self.configGroupForm.groupName
        };

        // 校验通过
        let result = await configGroupAPI.updateConfigGroup(tempConfigGroupForm);
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
        // 操作成功之后
        self.storageFun();
        self.close();
        self.getList();
      },

      // 取消新增
      cancelSubmit() {
        let self = this;
        self.close();
      },
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
