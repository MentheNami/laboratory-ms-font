<template>
  <div class="add-dialog">
    <el-form :model="searchForm" :rules="rules" ref="searchForm" label-width="150px" class="demo-ruleForm">

      <el-form-item label="编号规则" prop="complainantName">
        <el-input v-model="searchForm.prefixNumber" style="float:left;width: 200px;margin: 0 0 0 5px"></el-input>
      </el-form-item>

      <el-tooltip content="修改" placement="bottom" effect="light">
        <el-button type="success"  icon="icon-tsy-new"  circle @click="submitForm('searchForm')" style="clear:both;float: left;margin-left: 150px"></el-button>
      </el-tooltip>
      <el-tooltip content="取消" placement="bottom" effect="light">
        <el-button  el-button type="info"  icon="icon-tsy-quxiao"  circle  @click="cancelSubmit" style="margin-left: 10px"></el-button>
      </el-tooltip>

    </el-form>
  </div>
</template>

<script>
  import numberAPI from "../../api/system/Number"

      export default {
        name: "edit-number",
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
            searchForm: {
              page: 1,
              rows: 10,
              prefixNumber: '',
            },

            // 校验规则
            rules: {
              prefixNumber: [
                {required: true, message: '请输入编码规则', trigger: 'blur'}
              ],
            }

          }
        },

        mounted() {
          let self = this;
          self.selectById();
        },

        methods: {

          // 获取单个配置组详情
          async selectById() {
            let self = this;
            let result = await numberAPI.getNumberRule({id: self.id});
            if (!result.status) {
              self.$message({
                message: result.reason,
                type: 'warning'
              });
            }
            self.numberAPI = { prefixNumber: result.detail.value};
          },

          // 修改
          async submitForm(searchForm) {
            let self = this;
            self.$refs[searchForm].validate((valid) => {
              if (valid) {
              } else {
                return false;
              }
            });

            let tempSearchForm = {
              id: self.id,
              prefixNumber: self.searchForm.prefixNumber
            };

            // 校验通过
            let result = await numberAPI.updateNumberRule(tempSearchForm);
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

</style>
