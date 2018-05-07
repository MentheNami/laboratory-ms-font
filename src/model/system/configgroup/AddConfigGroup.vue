<template>
  <div class="add-dialog">
    <el-form ref="configGroupForm" :model="configGroupForm" :rules="rules" label-
             width="100px" :inline="true" label-position="right">
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
      <el-button type="success" icon="el-icon-plus" size="medium" @click="submitForm
('configGroupForm')" round >新增
      </el-button>
      <el-button type="warning" icon="el-icon-close" size="medium" @click="cancelSubmit" round style="margin-left: 20px">
        取消
      </el-button>
    </div>
  </div>
</template>

<script>

  import configGroupAPI from '../../../api/system/ConfigGroup'

  export default {
    name: "add-config-group",
    props: {
      close: {
        type: Function,
        required: false
      },
      getList: {
        type: Function,
        required: false
      }
    },
    data() {
      return {
        configGroupForm: {
          groupKey: '',
          groupName: '',
        },

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

    methods: {
      async submitForm(configGroupForm) {
        let self = this;
        self.$refs[configGroupForm].validate((valid) => {
          if (valid) {
          } else {
            return false;
          }
        });
        // 校验通过
        let result = await configGroupAPI.addConfigGroup(self.configGroupForm);
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
